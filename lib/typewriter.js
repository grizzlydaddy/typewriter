(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Typewriter"] = factory();
	else
		root["Typewriter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/typewriter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/typewriter.js":
/*!***************************!*\
  !*** ./src/typewriter.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (function(root, factory) {
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], factory);
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but
//     // only CommonJS-like environments that support module.exports,
//     // like Node.
//     module.exports = factory();
//   } else {
//     // Browser globals (root is window)
//     root.typewriter = factory();
//   }
// }(this, () => {
//
//   function typeit($el, text, speed){
//     var schedule = ( function f(){
//       setTimeout( () => {
//         if( text.length ){
//           $el[0].childNodes[0].replaceWith( $el[0].childNodes[0].wholeText + text.shift() );
//           schedule();
//         } else {
//           $el.find('.typeme-cursor').addClass('finished');
//         }
//       }, ( / /.test(text[0]) ) ? 0 : speed + Math.floor(Math.random() * Math.floor(40) ));
//
//       return f;
//     })();
//   }
//
//   function typewriter( params ){
//     let t = params.speed;
//     let $el = params.el;
//     let cursor = params.cursor;
//
//     if( params.fixePosition ){
//
//       $el
//         .css('visibility','hidden')
//         .text( params.text.join('') + ( cursor || '' ) )
//         .css({
//           'width': $el.width(),
//           'height': $el.height()
//         })
//         .text('')
//         .css('visibility','visible')
//       ;
//     }
//
//     $el.text(' ');
//     if( cursor ){
//       let cursorStyle = `
//         <style type="text/css" class="typeme cursor">
//
//           @keyframes blink {
//             0% {
//               opacity: 1 }
//             50% {
//               opacity: 0 }
//             100% {
//               opacity: 1 }
//           }
//
//           .typeme-cursor.finished {
//             opacity: 1;
//             animation: blink .7s infinite;
//           }
//         </style>`;
//       $('head').append(cursorStyle);
//       $el.append('<span class="typeme-cursor">' + cursor + '</span>')
//     }
//
//     typeit($el, params.text, params.speed);
//   }
//
//   typewriter.version = '1.0.0';
//
// return typewriter;
//
// }));

var Typewriter = function () {
  function Typewriter(params) {
    _classCallCheck(this, Typewriter);

    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed;
    this.fixePosition = params.fixePosition;
    this.text = params.text || '';
    this.writingSequences = this.setText();

    this.typeit();
  }

  _createClass(Typewriter, [{
    key: 'setText',
    value: function setText() {
      var _this = this;

      return Array.prototype.map.call(document.querySelectorAll(this.target), function (e) {
        return {
          target: e,
          text: [].concat(_toConsumableArray(e.dataset.typeit)) || [].concat(_toConsumableArray(_this.text))
        };
      });
    }
  }, {
    key: 'setCursor',
    value: function setCursor(target) {
      if (this.cursor) {

        var cursorStyle = '\n          @keyframes blink {\n            0% {\n              opacity: 1 }\n            50% {\n              opacity: 0 }\n            100% {\n              opacity: 1 }\n          }\n\n          .typewriter-cursor.end {\n            opacity: 1;\n            animation: blink .7s infinite;\n          }';

        var style = document.head.appendChild(document.createElement('style'));
        style.type = 'text/css';
        style.appendChild(document.createTextNode(cursorStyle));
        console.log(style);

        var cursor = target.appendChild(document.createElement('span'));
        cursor.textContent = this.cursor;
        cursor.className = 'typewriter-cursor';
        return cursor;
      } else {
        return;
      }
    }
  }, {
    key: 'typeit',
    value: function typeit() {
      var _this2 = this;

      var typeLetters = function typeLetters(sequence) {
        setTimeout(function () {
          if (sequence.text.length) {
            sequence.textNode.nodeValue += sequence.text.shift();
            typeLetters(sequence);
          } else if (sequence.cursor) {
            sequence.cursor.className += ' end';
          }
        }, / /.test(sequence.text[0]) ? 0 : _this2.speed + Math.floor(Math.random() * Math.floor(40)));
      };

      this.writingSequences.forEach(function (sequence) {
        sequence.textNode = sequence.target.appendChild(document.createTextNode(''));
        sequence.cursor = _this2.setCursor(sequence.target);
        typeLetters(sequence);
      });
    }
  }]);

  return Typewriter;
}();

exports.default = Typewriter;

{
  {}
}

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=../maps/typewriter.js.map