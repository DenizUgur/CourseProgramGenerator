import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import $ from "jquery";
import { getWorld, getResult } from "./brain/process";

const moment = require("moment");
moment.locale("tr");

$("#app").css("display", "block");

$("#courses_i").on("keypress", event => {
  $("#courses").empty();
  event.target.value.split(" ").forEach(i => {
    if (i.includes(".")) {
      var name = i.substring(0, i.indexOf("."));
      var parent = $("<span>", {
        class: "mdl-chip mdl-chip--contact"
      });
      parent.append(
        $("<span>", {
          class: "mdl-chip__contact mdl-color--blue-500 mdl-color-text--white"
        }).html(name.toUpperCase())
      );
      parent.append(
        $("<span>", {
          class: "mdl-chip__text"
        }).html(i.substring(i.indexOf(".") + 1))
      );
      $("#courses").append(parent);
    }
  });
});

$("#uhours_i").on("keypress", event => {
  var hours = [];
  var weekdays = ["Mo", "Tu", "We", "Th", "Fr"];
  var input = event.target.value.split(" ");
  if (input.length % 2 == 0) {
    input.forEach((v, index) => {
      var i = v.substring(0, v.indexOf(","));
      var clock = v.substring(v.indexOf(",") + 1);
      var hi = hours.findIndex(vi => vi.i == i);
      if (hi == -1) {
        hours.push({
          i: i,
          clock: clock
        });
      } else {
        hours[hi].clock = hours[hi].clock + " " + clock;
      }
    });
  }

  $("#uhours").empty();
  hours.forEach(val => {
    var wi = weekdays[val.i - 1];
    var hs = val.clock;
    var parent = $("<span>", {
      class: "mdl-chip mdl-chip--contact"
    });
    parent.append(
      $("<span>", {
        class: "mdl-chip__contact mdl-color--blue-500 mdl-color-text--white"
      }).html(wi.toUpperCase())
    );
    parent.append(
      $("<span>", {
        class: "mdl-chip__text"
      }).html(hs)
    );
    $("#uhours").append(parent);
  });
});

$("#start").on("click", () => {
  if ($("#courses_i").val() != "") {
    getWorld().then(world => {
      getResult(
        world,
        $("#courses_i")
          .val()
          .trim()
          .toUpperCase(),
        $("#uhours_i")
          .val()
          .trim()
      ).then(tables => drawTable(tables));
    });
  } else {
    alert("Enter a course!");
  }
});

function drawTable(tables) {
  $(".mdl-layout__tab").each(i => {
    if (i == 0) {
      $(".mdl-layout__tab-panel:eq(" + i + ")").toggleClass("is-active");
      $(".mdl-layout__tab:eq(" + i + ")").toggleClass("is-active");
    } else if (i == 1) {
      $(".mdl-layout__tab-panel:eq(" + i + ")").toggleClass("is-active");
      $(".mdl-layout__tab:eq(" + i + ")").toggleClass("is-active");
    }
    $(".mdl-layout__tab:eq(" + i + ")").removeClass("hidden");
  });
  $("#mprogram").empty();
  for (var i = 0; i < 5 * 11; i++) $("#mprogram").append($("<div>"));
  $("#alternatives tbody").empty();
  $("#mainlist tbody").empty();
  var pluss = [];
  var m_plus_s = tables[0].concat(tables[1]);

  m_plus_s
    .sort((x, y) => (x[0] + x[3] < y[0] + y[3] ? -1 : 1))
    .forEach(c => {
      var parent = $("<tr>");
      c.forEach((cc, i) => {
        if (i == 3) cc = moment.weekdays(true)[cc - 1];
        parent.append($("<td>").html(cc));
      });
      $("#mainlist tbody").append(parent);
    });

  m_plus_s.forEach(c => {
    var start = Number.parseInt(c[4].split(":")[0]);
    var end = Number.parseInt(c[5].split(":")[0]);
    if (end - 1 > start) {
      for (var i = 1; i < end - start; i++) {
        var nc = [...c];
        nc[4] = start + i + ":40";
        nc.push(true); // tells that this object doesn't need a name
        pluss.push(nc);
      }
    }
  });

  m_plus_s.concat(pluss).forEach(c => {
    var parent = $("<div>", {
      class:
        "accent-color-" +
        (m_plus_s.findIndex(el => el[0] == c[0]) + 1) +
        "-gradient"
    });
    var start = Number.parseInt(c[4].split(":")[0]);
    var indexday =
      start - 8 + (Number.parseInt(c[4].split(":")[1]) < 30 ? 1 : 0);

    var index = c[3] - 1 + indexday * 5;
    var class_name;
    if (c.length <= 6) {
      class_name =
        c[1].indexOf(",") > 0 ? c[1].substring(0, c[1].indexOf(",")) : c[1];
      class_name = c[0] + "." + class_name;
    } else {
      class_name = "";
    }
    parent.append($("<span>", { class: "name" }).text(class_name));
    $("#mprogram > div:eq(" + index + ")").append(parent);
  });
  tables[2].forEach(c => {
    var parent = $("<tr>");
    c.forEach((cc, i) => {
      if (i == 3) cc = moment.weekdays(true)[cc - 1];
      parent.append($("<td>").html(cc));
    });
    $("#alternatives tbody").append(parent);
  });
  $("#errors").html(tables[4].join("</br>"));
  $(".mdl-layout-title").text(
    "Course Program Generator (" + tables[3] + " Credits)"
  );
}
