const XLSX = require("xlsx");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

let directoryPath = path.join(__dirname, "bin");
var worksheet = null;
var errors = [];

export function getWorld() {
  var world = [];
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      directoryPath = path.join(__dirname, "../../app/bin");
    }
    fs.readdir(directoryPath, function(err, files) {
      if (err) {
        log("Catalogs must be placed in 'bin' folder");
        reject();
      }

      files.forEach(function(file) {
        if (file == ".DS_Store") return false;
        var workbook = XLSX.readFile(path.join(directoryPath, file));
        var data = workbook.SheetNames[0];
        worksheet = workbook.Sheets[data];

        for (var ii = 2; cell(0, ii) != undefined; ii++) {
          var course = {
            name: null,
            credits: null,
            class: null,
            teacher: null,
            corequisite: null,
            hours: []
          };
          course.name = cell(0, ii) + "." + cell(1, ii);
          course.credits = parseInt(cell(5, ii));
          course.class = cell(2, ii);
          course.teacher = cell(3, ii).lowerCaseAllWordsExceptFirstLetters();

          //corequisite
          if (cell(4, ii) && cell(4, ii) != "-") {
            course.corequisite = [];
            if (cell(4, ii).indexOf(" ve ") != -1) {
              course.corequisite = cell(4, ii).split(" ve ");
            } else {
              course.corequisite = cell(4, ii).split(" and ");
            }
            course.corequisite = course.corequisite.map(item => {
              return item.replace(" ", ".");
            });
          }

          //hours
          var hours = cell(6, ii).split("\n");
          for (var hour in hours) {
            if (hours[hour] == "") continue;
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
      resolve(world);
    });
  });
}

export function getResult(world, input, unavailable_hours = "") {
  return new Promise((resolve, reject) => {
    var found = [];
    var result = [];
    errors = [];

    unavailable_hours = unavailable_hours.split(" ");
    input = input.split(" ");

    unavailable_hours.forEach(function(el, i) {
      if (i % 2 == 1) {
        result.push({
          name: null,
          class: null,
          hours: [
            [
              moment(unavailable_hours[i - 1], "d,HH:mm").valueOf(),
              moment(el, "d,HH:mm").valueOf()
            ]
          ]
        });
      }
    });

    //Show if anything is not found in the world
    input.forEach(function(el) {
      var f = false;
      world.forEach(function(eli) {
        if (el == eli.name) f = true;
      });
      if (!f) log(el + " not found.");
    });

    //Sort so that it is guarenteed that A section will be recommended first
    world.sort((x, y) => (x.class < y.class ? -1 : 1));

    //Populate found
    input.forEach(function(el, i) {
      world.forEach(function(eli) {
        if (eli.name == el.toUpperCase()) {
          found.push(eli);
          if (eli.corequisite) {
            eli.corequisite.forEach(function(elii) {
              world.forEach(function(eliii) {
                if (eliii.name.replace(".", "") == elii || eliii.name == elii) {
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
    found.forEach(function(currentCourse) {
      var qualifierOBJ = {
        name: currentCourse.name,
        selected: null,
        collidesWith: [],
        candidates: [currentCourse],
        alternatives: []
      };

      var s = qualifiers.findIndex(q => {
        return q.name == currentCourse.name;
      });

      if (s != -1) {
        qualifiers[s].candidates.push(currentCourse);
      } else {
        qualifiers.push(qualifierOBJ);
      }
    });

    //Create beautiful result
    qualifiers.forEach((qu, i) => {
      try {
        qu.candidates.forEach(quc => {
          var eligible = true;

          //Check if it collides with unavailable hours
          result.forEach(res => {
            res.hours.forEach(U => {
              quc.hours.forEach(I => {
                if (isColliding(U, I)) eligible = false;
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
                          return ci.name == qi.name;
                        }) == -1
                      ) {
                        qualifiers[i].collidesWith.push(qi);
                      }
                      eligible = false;
                    }
                  });
                });
              }

              //If failed, lastly try to change the classes that it collides with their candidates
              if (!eligible && iii == qualifiers.length - 1) {
                try {
                  qu.collidesWith.forEach(col => {
                    log(
                      quc.name +
                        "." +
                        quc.class +
                        " collides with " +
                        col.name +
                        "." +
                        col.selected.class
                    );

                    if (col.candidates.length > 1) {
                      log(
                        "Trying to change " +
                          col.name +
                          " with a different class"
                      );

                      col.candidates.forEach(colcan => {
                        if (col.selected.class != colcan.class) {
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
                              return fi.name == col.name;
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
                              log(
                                "Wuhuu, we can change it with " +
                                  colcan.name +
                                  "." +
                                  colcan.class
                              );
                              log();
                              eligible = true;
                              throw BreakException;
                            } else {
                              qualifiers[
                                original_index
                              ].selected = original_selected;
                            }
                          }
                        }
                      });
                    } else {
                      log("There is nothing we can do!");
                      throw BreakException;
                    }
                    log("Failed!\n");
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
    qualifiers.forEach(function(q, i) {
      if (q.selected && q.selected.corequisite) {
        var parents = q.selected.corequisite;
        var eligible = false;
        parents.forEach(function(p) {
          qualifiers.forEach(function(qf) {
            if (qf.selected) {
              if (p == qf.name.replace(".", "") || p == qf.name) eligible = true;
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
    var excess = [];
    qualifiers.forEach(q => {
      q.candidates.forEach(qc => {
        var eligible = true;
        try {
          qualifiers.forEach(iq => {
            //Has selected course
            if (iq.selected) {
              iq.selected.hours.forEach(U => {
                qc.hours.forEach(I => {
                  if (iq.name == qc.name && isEqual(U, I)) {
                    //Check if same name and same hours
                    eligible = iq.selected.class != qc.class;
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
          alternatives.push([
            qc.name,
            qc.class,
            qc.teacher,
            moment(qc.hours[0][0]).day(),
            moment(qc.hours[0][0]).format("HH:mm"),
            moment(qc.hours[0][1]).format("HH:mm")
          ]);
        }
      });
    });

    qualifiers.forEach(q => {
      if (q.selected) result.push(q.selected);
    });

    //Print results
    var total_credits = 0;
    result.forEach(function(el) {
      if (el.name) {
        table.push([
          el.name,
          el.class,
          el.teacher,
          moment(el.hours[0][0]).day(),
          moment(el.hours[0][0]).format("HH:mm"),
          moment(el.hours[0][1]).format("HH:mm")
        ]);
        total_credits += el.credits;
      }
      if (el.hours.length > 1) {
        if (el.name) {
          excess.push([
            el.name,
            el.class,
            el.teacher,
            moment(el.hours[1][0]).day(),
            moment(el.hours[1][0]).format("HH:mm"),
            moment(el.hours[1][1]).format("HH:mm")
          ]);
        }
      }
    });

    //Check if anything has failed
    input.forEach(function(eli) {
      var f = false;
      result.forEach(function(el) {
        if (eli == el.name) f = true;
      });
      if (!f) log(eli + " is impossible to fit to your importance order.");
    });
    resolve([table, excess, alternatives, total_credits, errors]);
  });
}

function isColliding(a, b) {
  return (a[0] <= b[0] && b[0] <= a[1]) || (b[0] <= a[0] && a[0] <= b[1]);
}

String.prototype.lowerCaseAllWordsExceptFirstLetters = function() {
  var arr = this.split(" ");
  arr.forEach(function(word, i) {
    arr[i] = word.charAt(0) + word.slice(1).toLowerCase();
  });
  return arr.join(" ");
};

function cell(i, ii) {
  var read_cell = ["A", "B", "C", "G", "I", "F", "L"];
  var desired_cell = worksheet[read_cell[i] + ii];
  return desired_cell ? desired_cell.v : undefined;
}

function isEqual(a, b) {
  if (a == undefined || b == undefined) return false;
  return a[0] == b[0] && a[1] == b[1];
}

function parseHourOBJ(origin) {
  moment.locale("tr");
  var hourOBJ = [null, null];

  var day = origin.split(" | ")[0];
  hourOBJ[0] = origin
    .split(" | ")[1]
    .split(" - ")[0]
    .trim();
  hourOBJ[1] = origin
    .split(" | ")[1]
    .split(" - ")[1]
    .trim();

  day = moment.weekdays(true).indexOf(day);
  hourOBJ[0] = moment("1," + hourOBJ[0], "d,HH:mm")
    .add(day, "d")
    .valueOf();
  hourOBJ[1] = moment("1," + hourOBJ[1], "d,HH:mm")
    .add(day, "d")
    .valueOf();

  return hourOBJ;
}

function log(msg) {
  errors.push(msg);
}
