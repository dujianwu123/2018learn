!function(r){var n={};function t(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return r[e].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=r,t.c=n,t.d=function(r,n,e){t.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:e})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,n){if(1&n&&(r=t(r)),8&n)return r;if(4&n&&"object"==typeof r&&r&&r.__esModule)return r;var e=Object.create(null);if(t.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:r}),2&n&&"string"!=typeof r)for(var o in r)t.d(e,o,function(n){return r[n]}.bind(null,o));return e},t.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(n,"a",n),n},t.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},t.p="./dist/",t(t.s=3)}([function(r,n,t){"use strict";r.exports=function(r){var n=[];return n.toString=function(){return this.map(function(n){var t=function(r,n){var t=r[1]||"",e=r[3];if(!e)return t;if(n&&"function"==typeof btoa){var o=(f=e,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(f))))+" */"),i=e.sources.map(function(r){return"/*# sourceURL="+e.sourceRoot+r+" */"});return[t].concat(i).concat([o]).join("\n")}var f;return[t].join("\n")}(n,r);return n[2]?"@media "+n[2]+"{"+t+"}":t}).join("")},n.i=function(r,t){"string"==typeof r&&(r=[[null,r,""]]);for(var e={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(e[i]=!0)}for(o=0;o<r.length;o++){var f=r[o];null!=f[0]&&e[f[0]]||(t&&!f[2]?f[2]=t:t&&(f[2]="("+f[2]+") and ("+t+")"),n.push(f))}},n}},function(r,n){r.exports=function(r){return console.log(r),console.log(window.innerWidth),window.innerWidth>=780?r.replace("grey","green"):r}},function(r,n,t){var e,o,i={},f=(e=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=e.apply(this,arguments)),o}),u=function(r){var n={};return function(r,t){if("function"==typeof r)return r();if(void 0===n[r]){var e=function(r,n){return n?n.querySelector(r):document.querySelector(r)}.call(this,r,t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(r){e=null}n[r]=e}return n[r]}}(),c=null,a=0,s=[],p=t(6);function d(r,n){for(var t=0;t<r.length;t++){var e=r[t],o=i[e.id];if(o){o.refs++;for(var f=0;f<o.parts.length;f++)o.parts[f](e.parts[f]);for(;f<e.parts.length;f++)o.parts.push(g(e.parts[f],n))}else{var u=[];for(f=0;f<e.parts.length;f++)u.push(g(e.parts[f],n));i[e.id]={id:e.id,refs:1,parts:u}}}}function h(r,n){for(var t=[],e={},o=0;o<r.length;o++){var i=r[o],f=n.base?i[0]+n.base:i[0],u={css:i[1],media:i[2],sourceMap:i[3]};e[f]?e[f].parts.push(u):t.push(e[f]={id:f,parts:[u]})}return t}function l(r,n){var t=u(r.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var e=s[s.length-1];if("top"===r.insertAt)e?e.nextSibling?t.insertBefore(n,e.nextSibling):t.appendChild(n):t.insertBefore(n,t.firstChild),s.push(n);else if("bottom"===r.insertAt)t.appendChild(n);else{if("object"!=typeof r.insertAt||!r.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=u(r.insertAt.before,t);t.insertBefore(n,o)}}function v(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r);var n=s.indexOf(r);n>=0&&s.splice(n,1)}function b(r){var n=document.createElement("style");if(void 0===r.attrs.type&&(r.attrs.type="text/css"),void 0===r.attrs.nonce){var e=function(){0;return t.nc}();e&&(r.attrs.nonce=e)}return m(n,r.attrs),l(r,n),n}function m(r,n){Object.keys(n).forEach(function(t){r.setAttribute(t,n[t])})}function g(r,n){var t,e,o,i;if(n.transform&&r.css){if(!(i="function"==typeof n.transform?n.transform(r.css):n.transform.default(r.css)))return function(){};r.css=i}if(n.singleton){var f=a++;t=c||(c=b(n)),e=U.bind(null,t,f,!1),o=U.bind(null,t,f,!0)}else r.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(r){var n=document.createElement("link");return void 0===r.attrs.type&&(r.attrs.type="text/css"),r.attrs.rel="stylesheet",m(n,r.attrs),l(r,n),n}(n),e=function(r,n,t){var e=t.css,o=t.sourceMap,i=void 0===n.convertToAbsoluteUrls&&o;(n.convertToAbsoluteUrls||i)&&(e=p(e));o&&(e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var f=new Blob([e],{type:"text/css"}),u=r.href;r.href=URL.createObjectURL(f),u&&URL.revokeObjectURL(u)}.bind(null,t,n),o=function(){v(t),t.href&&URL.revokeObjectURL(t.href)}):(t=b(n),e=function(r,n){var t=n.css,e=n.media;e&&r.setAttribute("media",e);if(r.styleSheet)r.styleSheet.cssText=t;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(t))}}.bind(null,t),o=function(){v(t)});return e(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap)return;e(r=n)}else o()}}r.exports=function(r,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||"boolean"==typeof n.singleton||(n.singleton=f()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var t=h(r,n);return d(t,n),function(r){for(var e=[],o=0;o<t.length;o++){var f=t[o];(u=i[f.id]).refs--,e.push(u)}r&&d(h(r,n),n);for(o=0;o<e.length;o++){var u;if(0===(u=e[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete i[u.id]}}}};var w,x=(w=[],function(r,n){return w[r]=n,w.filter(Boolean).join("\n")});function U(r,n,t,e){var o=t?"":e.css;if(r.styleSheet)r.styleSheet.cssText=x(n,o);else{var i=document.createTextNode(o),f=r.childNodes;f[n]&&r.removeChild(f[n]),f.length?r.insertBefore(i,f[n]):r.appendChild(i)}}},function(r,n,t){"use strict";t.r(n);t(4),t(7)},function(r,n,t){var e,o=t(5);"string"==typeof o&&(o=[[r.i,o,""]]),e=t(1);var i={insertInto:"#box",singleton:!0,transform:"./css.transform.js",hmr:!0};i.transform=e,i.insertInto="#box";t(2)(o,i);o.locals&&(r.exports=o.locals)},function(r,n,t){(r.exports=t(0)(!1)).push([r.i,"body{\r\n  width: 100%;\r\n  height: 100%;\r\n  background:grey;\r\n}",""])},function(r,n){r.exports=function(r){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!r||"string"!=typeof r)return r;var t=n.protocol+"//"+n.host,e=t+n.pathname.replace(/\/[^\/]*$/,"/");return r.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(r,n){var o,i=n.trim().replace(/^"(.*)"$/,function(r,n){return n}).replace(/^'(.*)'$/,function(r,n){return n});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?r:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?t+i:e+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(r,n,t){var e,o=t(8);"string"==typeof o&&(o=[[r.i,o,""]]),e=t(1);var i={insertInto:"#box",singleton:!0,transform:"./css.transform.js",hmr:!0};i.transform=e,i.insertInto="#box";t(2)(o,i);o.locals&&(r.exports=o.locals)},function(r,n,t){(r.exports=t(0)(!1)).push([r.i,"#box{\r\n  width: 100px;\r\n  height: 100px;\r\n  background: red;\r\n}",""])}]);