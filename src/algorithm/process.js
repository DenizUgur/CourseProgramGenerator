/* eslint-disable no-undef */
const originalMoment = require('moment');
const moment = (...args) => originalMoment.utc(...args);
var errors = [];

export function getResult(world, input, unavailable_hours, referance_time) {
	return new Promise((resolve, reject) => {
		var found = [];
		var result = [];
		errors = [];

		if (unavailable_hours) {
			const normalize = time => {
				const now = moment(time).diff(moment(0), 'week');
				const ref = moment(referance_time).diff(moment(0), 'week');

				let diff = now - ref < 0 ? 0 : now - ref;
				return moment(time).subtract(diff, 'week').valueOf();
			};

			unavailable_hours.forEach(function (el, i) {
				result.push({
					name: null,
					class: null,
					hours: [[normalize(el.start), normalize(el.end)]],
				});
			});
		}

		//Sort so that it is guarenteed that A section will be recommended first
		world.sort((x, y) => (x.class < y.class ? -1 : 1));

		//Populate found
		input.forEach(function (el, i) {
			world.forEach(function (eli) {
				if (eli.name === el.toUpperCase()) {
					found.push(eli);
					if (eli.corequisite) {
						eli.corequisite.forEach(function (elii) {
							world.forEach(function (eliii) {
								if (eliii.name.replace('.', '') === elii || eliii.name === elii) {
									found.push(eliii);
								}
							});
						});
					}
				}
			});
		});

		//Populate qualifiers with candidates.
		var qualifiers = [];
		found.forEach(function (currentCourse) {
			var qualifierOBJ = {
				name: currentCourse.name,
				selected: null,
				collidesWith: [],
				candidates: [currentCourse],
				alternatives: [],
			};

			var s = qualifiers.findIndex(q => {
				return q.name === currentCourse.name;
			});

			if (s !== -1) {
				qualifiers[s].candidates.push(currentCourse);
			} else {
				qualifiers.push(qualifierOBJ);
			}
		});

		//Create beautiful result
		qualifiers.forEach((qu, i) => {
			try {
				qu.candidates.forEach((quc, ci) => {
					var eligible = true;

					//Check if it collides with unavailable hours
					result.forEach(res => {
						res.hours.forEach(U => {
							quc.hours.forEach(I => {
								if (isColliding(U, I)) {
									eligible = false;
									log({
										name: quc.name,
										message: {
											long: `${quc.name} collides with the unavailable hours you defined. We have tried every possible combination between them but there wasn't any solution.`,
											short: `${quc.name} collides with unavailable hours.`,
										},
									});
								}
							});
						});
					});

					if (eligible) {
						//Try to fit on the first try
						//If it fails gather which courses it collides with
						qualifiers.forEach((qi, iii) => {
							if (qi.selected) {
								qi.selected.hours.forEach(U => {
									quc.hours.forEach(I => {
										if (isColliding(U, I)) {
											if (
												qualifiers[i].collidesWith.findIndex(ci => {
													return ci.name === qi.name;
												}) === -1
											) {
												qualifiers[i].collidesWith.push(qi);
											}
											eligible = false;
										}
									});
								});
							}

							//If failed, lastly try to change the classes that it collides with their candidates
							if (!eligible && iii === qualifiers.length - 1) {
								try {
									qu.collidesWith.forEach(col => {
										if (col.candidates.length > 1) {
											col.candidates.forEach(colcan => {
												if (col.selected.class !== colcan.class) {
													var inner_eligible = true;
													qualifiers.forEach(qi => {
														if (qi.selected) {
															qi.selected.hours.forEach(U => {
																colcan.hours.forEach(I => {
																	if (isColliding(U, I)) {
																		inner_eligible = false;
																	}
																});
															});
														}
													});
													if (inner_eligible) {
														//Okay so, we can move colliding class to another
														//But if we assume the new class in place
														//Can we place current class into the new place (quc)

														//First find index of col on qualifier and change class
														//But save original class
														var original_index = qualifiers.findIndex(fi => {
															return fi.name === col.name;
														});
														var original_selected = col.selected;

														qualifiers[original_index].selected = colcan;

														//Check if quc or colcan collides with unavailable hours
														result.forEach(res => {
															res.hours.forEach(U => {
																quc.hours.forEach(I => {
																	if (isColliding(U, I)) inner_eligible = false;
																});
																colcan.hours.forEach(I => {
																	if (isColliding(U, I)) inner_eligible = false;
																});
															});
														});

														//Test for other courses
														qualifiers.forEach(qi => {
															if (qi.selected) {
																qi.selected.hours.forEach(U => {
																	quc.hours.forEach(I => {
																		if (isColliding(U, I)) {
																			inner_eligible = false;
																		}
																	});
																});
															}
														});

														if (inner_eligible) {
															eligible = true;
															throw BreakException;
														} else {
															qualifiers[original_index].selected = original_selected;
														}
													}
												}
											});
										} else {
											log({
												name: quc.name,
												collidesWith: col.name,
												message: {
													long: `${quc.name} collides with ${col.name}. We have tried every 
                          possible combination between them but there wasn't any solution.`,
													short: `${quc.name} collides with ${col.name}.`,
												},
											});
											throw BreakException;
										}
										log({
											name: quc.name,
											message: {
												long: `There weren't any alternative section for ${quc.name}. 
                        So, we couldn't fit ${quc.name} to your program.`,
												short: `${quc.name} is single section and it didn't fit to your program.`,
											},
										});
									});
								} catch (ex) {}
							}
						});
					}

					if (eligible) {
						if (!qualifiers[i].selected) qualifiers[i].selected = quc;
						throw BreakException;
					}
				});
			} catch (ex) {}
		});

		//Corequisite check, if fails remove all parent and children.
		qualifiers.forEach(function (q, i) {
			if (q.selected && q.selected.corequisite) {
				var parents = q.selected.corequisite;
				var eligible = false;
				parents.forEach(function (p) {
					qualifiers.forEach(function (qf) {
						if (qf.selected) {
							if (p === qf.name.replace('.', '') || p === qf.name) eligible = true;
						}
					});
				});

				if (!eligible) {
					qualifiers[i].selected = null;
				}
			}
		});

		//Add alternative classes
		var alternatives = [];
		var table = [];
		qualifiers.forEach(q => {
			q.candidates.forEach(qc => {
				var eligible = true;
				try {
					qualifiers.forEach(iq => {
						//Has selected course
						if (iq.selected) {
							iq.selected.hours.forEach(U => {
								qc.hours.forEach(I => {
									if (iq.name === qc.name && isEqual(U, I)) {
										//Check if same name and same hours
										eligible = iq.selected.class !== qc.class;
									} else if (!isColliding(U, I)) {
										//Check if it collides with any other courses
										eligible = true;
									} else {
										eligible = false;
									}

									result.forEach(res => {
										res.hours.forEach(U => {
											qc.hours.forEach(I => {
												if (isColliding(U, I)) eligible = false;
											});
										});
									});

									if (!eligible) throw BreakException();
								});
							});
						}
					});
				} catch (ex) {}

				if (eligible) {
					alternatives.push({
						name: qc.name,
						title: qc.title,
						credits: qc.credits,
						class: qc.class,
						teacher: qc.teacher,
						corequisite: qc.corequisite,
						hours: qc.hours,
					});
				}
			});
		});

		qualifiers.forEach(q => {
			if (q.selected) result.push(q.selected);
		});

		//Print results
		result.forEach(function (el) {
			if (el.name) {
				table.push({
					name: el.name,
					title: el.title,
					credits: el.credits,
					class: el.class,
					teacher: el.teacher,
					corequisite: el.corequisite,
					hours: el.hours,
				});
			}
		});

		// Final filter for alternatives
		alternatives = alternatives.filter(val => {
			return table.find(to => to.a === val.a);
		});

		//Clean logs if there are any course that was fitted after logged
		errors = errors.filter(val => {
			return !table.find(to => {
				return val.name === to.name;
			});
		});

		resolve({
			primary: table,
			alternatives,
			errors,
		});
	});
}

function isColliding(a, b) {
	return (a[0] <= b[0] && b[0] < a[1]) || (b[0] <= a[0] && a[0] < b[1]);
}

function isEqual(a, b) {
	if (a === undefined || b === undefined) return false;
	return a[0] === b[0] && a[1] === b[1];
}

function log(msg) {
	errors.push(msg);
}
