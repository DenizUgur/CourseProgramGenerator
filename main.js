const XLSX = require('xlsx');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

var worksheet = null;
let directoryPath = path.join(__dirname, 'bin');

var world = [];

fs.readdir(directoryPath, function (err, files) {
	if (err) {
		return new Error("Catalogs must be placed in 'bin' folder");
	}

	files.forEach(function (file) {
		if (file === '.DS_Store') return false;
		var workbook = XLSX.readFile(path.join(directoryPath, file));
		var data = workbook.SheetNames[0];
		worksheet = workbook.Sheets[data];

		for (var ii = 2; cell(0, ii) !== undefined; ii++) {
			var course = {
				name: null,
				title: null,
				credits: null,
				class: null,
				teacher: null,
				corequisite: null,
				hours: [],
			};
			course.name = cell(0, ii) + '.' + cell(1, ii);
			course.title = lowerCaseAllWordsExceptFirstLetters(cell(3, ii));
			course.credits = parseInt(cell(6, ii));
			course.class = cell(2, ii);
			course.teacher = lowerCaseAllWordsExceptFirstLetters(cell(4, ii));

			//corequisite
			if (cell(5, ii) && cell(5, ii) !== '-') {
				course.corequisite = [];
				if (cell(5, ii).indexOf(' ve ') !== -1) {
					course.corequisite = cell(5, ii).split(' ve ');
				} else {
					course.corequisite = cell(5, ii).split(' and ');
				}
				course.corequisite = course.corequisite.map(item => {
					return item.replace(' ', '.');
				});
			}

			//hours
			var hours = cell(7, ii).split('\n');
			for (var hour in hours) {
				if (hours[hour] === '') continue;
				try {
					var hourOBJ = parseHourOBJ(hours[hour]);
					if (
						course.hours.length > 0 &&
						isEqual(hourOBJ, course.hours[course.hours.length - 1])
					)
						continue;
					course.hours.push(hourOBJ);
				} catch (ex) {}
			}
			world.push(course);
		}
	});
	console.log(
		isUnique(world) ? 'No duplicates found.' : 'There are some duplicates'
	);
	fs.writeFileSync(
		'catalog.json',
		JSON.stringify({
			name: "Ozyegin 2020-2021 Spring",
			created_on: moment.utc().valueOf(),
			courses: world,
		})
	);
});

function isEqual(a, b) {
	if (a === undefined || b === undefined) return false;
	return a[0] === b[0] && a[1] === b[1];
}

function lowerCaseAllWordsExceptFirstLetters(input) {
	var arr = input.split(' ');
	arr.forEach(function (word, i) {
		arr[i] = word.charAt(0) + word.slice(1).toLowerCase();
	});
	return arr.join(' ');
}

function cell(i, ii) {
	var read_cell = ['A', 'B', 'C', 'D', 'G', 'I', 'F', 'L'];
	var desired_cell = worksheet[read_cell[i] + ii];
	return desired_cell ? desired_cell.v : undefined;
}

function parseHourOBJ(origin) {
	moment.locale('tr');
	var hourOBJ = [null, null];

	var day = origin.split(' | ')[0];
	hourOBJ[0] = origin.split(' | ')[1].split(' - ')[0].trim();
	hourOBJ[1] = origin.split(' | ')[1].split(' - ')[1].trim();

	day = moment.weekdays(true).indexOf(day);
	hourOBJ[0] = moment
		.utc('1,' + hourOBJ[0], 'd,HH:mm')
		.add(day, 'd')
		.valueOf();
	hourOBJ[1] = moment
		.utc('1,' + hourOBJ[1], 'd,HH:mm')
		.add(day, 'd')
		.valueOf();

	return hourOBJ;
}

function isUnique(arr) {
	const seenValues = {};

	for (let i = 0; i < arr.length; i++) {
		if (seenValues[arr[i].name + arr[i].class]) {
			return false;
		} else {
			seenValues[arr[i].name + arr[i].class] = true;
		}
	}

	return true;
}
