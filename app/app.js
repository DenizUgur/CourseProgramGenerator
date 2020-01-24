!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=15)}([function(e,t){e.exports=require("jquery")},function(e,t){e.exports=require("electron")},,function(e,t){e.exports=require("path")},function(e,t){e.exports=require("moment")},,,function(e,t,n){var r=n(8);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(10)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(9)(!1)).push([e.i,"html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n}\n\n.page-content {\n  padding: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: sans-serif;\n  color: #525252;\n}\n\n.row > * {\n  margin-bottom: 5px;\n}\n\na {\n  text-decoration: none;\n  color: #cb3837;\n}\n\ntd {\n  text-align: center !important;\n}\n\n.mdl-chip {\n  margin: 5px;\n}",""])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}var s;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var s=e[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){var r,o,a={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),i=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),c=null,l=0,u=[],f=n(11);function d(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=a[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(y(r.parts[s],t))}else{var i=[];for(s=0;s<r.parts.length;s++)i.push(y(r.parts[s],t));a[r.id]={id:r.id,refs:1,parts:i}}}}function p(e,t){for(var n=[],r={},o=0;o<e.length;o++){var a=e[o],s=t.base?a[0]+t.base:a[0],i={css:a[1],media:a[2],sourceMap:a[3]};r[s]?r[s].parts.push(i):n.push(r[s]={id:s,parts:[i]})}return n}function h(e,t){var n=i(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),u.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=i(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,o)}}function m(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function v(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),b(t,e.attrs),h(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,r,o,a;if(t.transform&&e.css){if(!(a=t.transform(e.css)))return function(){};e.css=a}if(t.singleton){var s=l++;n=c||(c=v(t)),r=x.bind(null,n,s,!1),o=x.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",b(t,e.attrs),h(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(s),i&&URL.revokeObjectURL(i)}.bind(null,n,t),o=function(){m(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){m(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return d(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o];(i=a[s.id]).refs--,r.push(i)}e&&d(p(e,t),t);for(o=0;o<r.length;o++){var i;if(0===(i=r[o]).refs){for(var c=0;c<i.parts.length;c++)i.parts[c]();delete a[i.id]}}}};var g,E=(g=[],function(e,t){return g[e]=t,g.filter(Boolean).join("\n")});function x(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=E(t,o);else{var a=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(a,s[t]):e.appendChild(a)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t){e.exports=require("xlsx")},function(e,t){e.exports=require("fs")},,function(e,t,n){"use strict";n.r(t);n(7);var r=n(1);const o=r.remote.Menu,a=r.remote.MenuItem,s=new a({label:"Cut",click:()=>{document.execCommand("cut")}}),i=new a({label:"Copy",click:()=>{document.execCommand("copy")}}),c=new a({label:"Paste",click:()=>{document.execCommand("paste")}}),l=new o;l.append(i);const u=new o;u.append(s),u.append(i),u.append(c),document.addEventListener("contextmenu",e=>{switch(e.target.nodeName){case"TEXTAREA":case"INPUT":e.preventDefault(),u.popup(r.remote.getCurrentWindow());break;default:(()=>""!==window.getSelection().toString())()&&(e.preventDefault(),l.popup(r.remote.getCurrentWindow()))}},!1);document.addEventListener("click",e=>{let t,n=!1;const o=a=>{"A"===a.nodeName&&(t=a.getAttribute("href")),a.classList.contains("js-external-link")&&(n=!0),t&&n?(r.shell.openExternal(t),e.preventDefault()):a.parentElement&&o(a.parentElement)};o(e.target)},!1);var f=n(0),d=n.n(f);const p=n(12),h=n(4),m=n(3),v=n(13);let b=m.join(__dirname,"bin");var y=null,g=[];function E(e,t){return e[0]<=t[0]&&t[0]<=e[1]||t[0]<=e[0]&&e[0]<=t[1]}function x(e,t){var n=y[["A","B","C","G","I","F","L"][e]+t];return n?n.v:void 0}function w(e,t){return null!=e&&null!=t&&(e[0]==t[0]&&e[1]==t[1])}function C(e){h.locale("tr");var t=[null,null],n=e.split(" | ")[0];return t[0]=e.split(" | ")[1].split(" - ")[0].trim(),t[1]=e.split(" | ")[1].split(" - ")[1].trim(),n=h.weekdays(!0).indexOf(n),t[0]=h("1,"+t[0],"d,HH:mm").add(n,"d").valueOf(),t[1]=h("1,"+t[1],"d,HH:mm").add(n,"d").valueOf(),t}function _(e){g.push(e)}String.prototype.lowerCaseAllWordsExceptFirstLetters=function(){var e=this.split(" ");return e.forEach(function(t,n){e[n]=t.charAt(0)+t.slice(1).toLowerCase()}),e.join(" ")};const O=n(4);O.locale("tr"),d()("#app").css("display","block"),d()("#courses_i").on("keypress",e=>{d()("#courses").empty(),e.target.value.split(" ").forEach(e=>{if(e.includes(".")){var t=e.substring(0,e.indexOf(".")),n=d()("<span>",{class:"mdl-chip mdl-chip--contact"});n.append(d()("<span>",{class:"mdl-chip__contact mdl-color--blue-500 mdl-color-text--white"}).html(t.toUpperCase())),n.append(d()("<span>",{class:"mdl-chip__text"}).html(e.substring(e.indexOf(".")+1))),d()("#courses").append(n)}})}),d()("#uhours_i").on("keypress",e=>{var t=[],n=["Mo","Tu","We","Th","Fr"],r=e.target.value.split(" ");r.length%2==0&&r.forEach((e,n)=>{var r=e.substring(0,e.indexOf(",")),o=e.substring(e.indexOf(",")+1),a=t.findIndex(e=>e.i==r);-1==a?t.push({i:r,clock:o}):t[a].clock=t[a].clock+" "+o}),d()("#uhours").empty(),t.forEach(e=>{var t=n[e.i-1],r=e.clock,o=d()("<span>",{class:"mdl-chip mdl-chip--contact"});o.append(d()("<span>",{class:"mdl-chip__contact mdl-color--blue-500 mdl-color-text--white"}).html(t.toUpperCase())),o.append(d()("<span>",{class:"mdl-chip__text"}).html(r)),d()("#uhours").append(o)})}),d()("#start").on("click",()=>{""!=d()("#courses_i").val()?function(e=!1){var t=[];return new Promise((n,r)=>{e&&(b=m.join(__dirname,"../app/bin")),v.readdir(b,function(e,o){e&&(_("Catalogs must be placed in 'bin' folder"),r()),o.forEach(function(e){if(".DS_Store"==e)return!1;var n=p.readFile(m.join(b,e)),r=n.SheetNames[0];y=n.Sheets[r];for(var o=2;null!=x(0,o);o++){var a={name:null,credits:null,class:null,teacher:null,corequisite:null,hours:[]};a.name=x(0,o)+"."+x(1,o),a.credits=parseInt(x(5,o)),a.class=x(2,o),a.teacher=x(3,o).lowerCaseAllWordsExceptFirstLetters(),x(4,o)&&"-"!=x(4,o)&&(a.corequisite=[],-1!=x(4,o).indexOf(" ve ")?a.corequisite=x(4,o).split(" ve "):a.corequisite=x(4,o).split(" and "),a.corequisite=a.corequisite.map(e=>e.replace(" ",".")));var s=x(6,o).split("\n");for(var i in s)if(""!=s[i])try{var c=C(s[i]);if(a.hours.length>0&&w(c,a.hours[a.hours.length-1]))continue;a.hours.push(c)}catch(e){continue}t.push(a)}}),n(t)})})}().then(e=>{(function(e,t,n=""){return new Promise((r,o)=>{var a=[],s=[];g=[],n=n.split(" "),t=t.split(" "),n.forEach(function(e,t){t%2==1&&s.push({name:null,class:null,hours:[[h(n[t-1],"d,HH:mm").valueOf(),h(e,"d,HH:mm").valueOf()]]})}),t.forEach(function(t){var n=!1;e.forEach(function(e){t==e.name&&(n=!0)}),n||_(t+" not found.")}),t.forEach(function(t,n){e.forEach(function(n){n.name==t.toUpperCase()&&(a.push(n),n.corequisite&&n.corequisite.forEach(function(t){e.forEach(function(e){e.name==t&&a.push(e)})}))})}),a.sort((e,t)=>e.class<t.class?-1:1);var i=[];a.forEach(function(e){var t={name:e.name,selected:null,collidesWith:[],candidates:[e],alternatives:[]},n=i.findIndex(t=>t.name==e.name);-1!=n?i[n].candidates.push(e):i.push(t)}),i.forEach((e,t)=>{try{e.candidates.forEach(n=>{var r=!0;if(s.forEach(e=>{e.hours.forEach(e=>{n.hours.forEach(t=>{E(e,t)&&(r=!1)})})}),r&&i.forEach((o,a)=>{if(o.selected&&o.selected.hours.forEach(e=>{n.hours.forEach(n=>{E(e,n)&&(-1==i[t].collidesWith.findIndex(e=>e.name==o.name)&&i[t].collidesWith.push(o),r=!1)})}),!r&&a==i.length-1)try{e.collidesWith.forEach(e=>{if(_(n.name+"."+n.class+" collides with "+e.name+"."+e.selected.class),!(e.candidates.length>1))throw _("There is nothing we can do!"),BreakException;_("Trying to change "+e.name+" with a different class"),e.candidates.forEach(t=>{if(e.selected.class!=t.class){var o=!0;if(i.forEach(e=>{e.selected&&e.selected.hours.forEach(e=>{t.hours.forEach(t=>{E(e,t)&&(o=!1)})})}),o){var a=i.findIndex(t=>t.name==e.name),c=e.selected;if(i[a].selected=t,s.forEach(e=>{e.hours.forEach(e=>{n.hours.forEach(t=>{E(e,t)&&(o=!1)}),t.hours.forEach(t=>{E(e,t)&&(o=!1)})})}),i.forEach(e=>{e.selected&&e.selected.hours.forEach(e=>{n.hours.forEach(t=>{E(e,t)&&(o=!1)})})}),o)throw _("Wuhuu, we can change it with "+t.name+"."+t.class),_(),r=!0,BreakException;i[a].selected=c}}}),_("Failed!\n")})}catch(e){}}),r)throw i[t].selected||(i[t].selected=n),BreakException})}catch(e){}}),i.forEach(function(e,t){if(e.selected&&e.selected.corequisite){var n=e.selected.corequisite,r=!1;n.forEach(function(e){i.forEach(function(t){t.selected&&e==t.name&&(r=!0)})}),r||(i[t].selected=null)}});var c=[],l=[],u=[];i.forEach(e=>{e.candidates.forEach(e=>{var t=!0;try{i.forEach(n=>{n.selected&&n.selected.hours.forEach(r=>{e.hours.forEach(o=>{if(t=n.name==e.name&&w(r,o)?n.selected.class!=e.class:!E(r,o),s.forEach(n=>{n.hours.forEach(n=>{e.hours.forEach(e=>{E(n,e)&&(t=!1)})})}),!t)throw BreakException()})})})}catch(e){}t&&c.push([e.name,e.class,e.teacher,h(e.hours[0][0]).day(),h(e.hours[0][0]).format("HH:mm"),h(e.hours[0][1]).format("HH:mm")])})}),i.forEach(e=>{e.selected&&s.push(e.selected)});var f=0;s.forEach(function(e){e.name&&(l.push([e.name,e.class,e.teacher,h(e.hours[0][0]).day(),h(e.hours[0][0]).format("HH:mm"),h(e.hours[0][1]).format("HH:mm")]),f+=e.credits),e.hours.length>1&&e.name&&u.push([e.name,e.class,e.teacher,h(e.hours[1][0]).day(),h(e.hours[1][0]).format("HH:mm"),h(e.hours[1][1]).format("HH:mm")])}),t.forEach(function(e){var t=!1;s.forEach(function(n){e==n.name&&(t=!0)}),t||_(e+" is impossible to fit to your importance order.")}),r([l,u,c,f,g])})})(e,d()("#courses_i").val().trim().toUpperCase(),d()("#uhours_i").val().trim()).then(e=>(function(e){d()(".mdl-layout__tab").each(e=>{0==e?(d()(".mdl-layout__tab-panel:eq("+e+")").toggleClass("is-active"),d()(".mdl-layout__tab:eq("+e+")").toggleClass("is-active")):1==e&&(d()(".mdl-layout__tab-panel:eq("+e+")").toggleClass("is-active"),d()(".mdl-layout__tab:eq("+e+")").toggleClass("is-active")),d()(".mdl-layout__tab:eq("+e+")").removeClass("hidden")}),d()("#mprogram").empty();for(var t=0;t<55;t++)d()("#mprogram").append(d()("<div>"));d()("#alternatives tbody").empty(),d()("#mainlist tbody").empty();var n=[],r=e[0].concat(e[1]);r.sort((e,t)=>e[0]+e[3]<t[0]+t[3]?-1:1).forEach(e=>{var t=d()("<tr>");e.forEach((e,n)=>{3==n&&(e=O.weekdays(!0)[e-1]),t.append(d()("<td>").html(e))}),d()("#mainlist tbody").append(t)}),r.forEach(e=>{var t=Number.parseInt(e[4].split(":")[0]),r=Number.parseInt(e[5].split(":")[0]);if(r-1>t)for(var o=1;o<r-t;o++){var a=[...e];a[4]=t+o+":40",a.push(!0),n.push(a)}}),r.concat(n).forEach(e=>{var t,n=d()("<div>",{class:"accent-color-"+(r.findIndex(t=>t[0]==e[0])+1)+"-gradient"}),o=Number.parseInt(e[4].split(":")[0]),a=o-8+(Number.parseInt(e[4].split(":")[1])<30?1:0),s=e[3]-1+5*a;e.length<=6?(t=e[1].indexOf(",")>0?e[1].substring(0,e[1].indexOf(",")):e[1],t=e[0]+"."+t):t="",n.append(d()("<span>",{class:"name"}).text(t)),d()("#mprogram > div:eq("+s+")").append(n)}),e[2].forEach(e=>{var t=d()("<tr>");e.forEach((e,n)=>{3==n&&(e=O.weekdays(!0)[e-1]),t.append(d()("<td>").html(e))}),d()("#alternatives tbody").append(t)}),d()("#errors").html(e[4].join("</br>")),d()(".mdl-layout-title").text("Course Program Generator ("+e[3]+" Credits)")})(e))}):alert("Enter a course!")})}]);
//# sourceMappingURL=app.js.map