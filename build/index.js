module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,u=void 0;try{for(var i,f=e[Symbol.iterator]();!(r=(i=f.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,u=e}finally{try{!r&&f.return&&f.return()}finally{if(o)throw u}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.useChange=i,t.useMousePosition=function(){var e=(0,u.useState)({x:0,y:0}),t=o(e,2),n=t[0],r=t[1];function i(e){r({x:e.clientX,y:e.clientY})}return(0,u.useEffect)((function(){return window.addEventListener("mousemove",i),function(){return window.removeEventListener("mousemove",i)}})),n},t.useMousePositionRelative=f,t.useMouseDrag=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=f(e),c=(0,u.useRef)(n),a=(0,u.useState)(null),s=o(a,2),l=s[0],v=s[1],d=(0,u.useState)(!1),y=o(d,2),p=y[0],m=y[1],b=function(e){t.every((function(e){return e(n)}))&&v(c.current)};function g(e){m(!1)}return(0,u.useEffect)((function(){c.current=n}),[n]),i((function(){m(!0)}),[l]),(0,u.useEffect)((function(){if(e)return e.addEventListener("mousedown",b),window.addEventListener("mouseup",g),function(){e.removeEventListener("mousedown",b),window.removeEventListener("mouseup",g)}}),[e]),{mousePosition:{start:r({},l),end:r({},n)},dragging:p}};var u=n(1);function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=(0,u.useRef)(!0);(0,u.useEffect)((function(){n.current||e(),n.current=!1}),t)}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=(0,u.useState)({x:0,y:10}),r=o(n,2),i=r[0],f=r[1];function c(e){f({x:e.clientX,y:e.clientY})}(0,u.useEffect)((function(){return window.addEventListener("mousemove",c),function(){return window.removeEventListener("mousemove",c)}}));var a={x:0,y:0};if(e){var s=e.getBoundingClientRect();a={x:s.left,y:s.top}}return{x:(i.x-a.x)/t,y:(i.y-a.y)/t}}},function(e,t){e.exports=require("react")}]);