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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Typewriter = function () {
  function Typewriter(params) {
    _classCallCheck(this, Typewriter);

    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed / 2;
    this.humanize = params.humanize === undefined ? true : params.humanize;
    this.fixePosition = params.fixePosition;
    this.text = params.text;
    this.ignoreWhitespace = params.ignoreWhitespace === undefined ? false : params.ignoreWhitespace;
    this.synchroniseCursors = params.synchroniseCursors === undefined ? true : params.synchroniseCursors;
    this.writingSequences = this.setText();

    this.typeit();
  }

  _createClass(Typewriter, [{
    key: 'setText',
    value: function setText() {
      var _this = this;

      return Array.from(document.querySelectorAll('.typeMe'), function (e) {
        return {
          target: e,
          text: Array.from(e.dataset.typeit || _this.text || e.textContent)
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
        var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.speed;

        if (_this2.humanize) {
          speed = Math.abs(Math.random() * _this2.speed + _this2.speed / 2);
          speed = Math.round(speed) % 2 && speed > _this2.speed / 0.25 ? _this2.speed / 2 : speed;
        }
        setTimeout(function () {
          if (sequence.text.length) {
            sequence.textNode.nodeValue += sequence.text.shift();
            typeLetters(sequence, speed);
          } else if (sequence.cursor) {
            sequence.cursor.classList.add('end');
            if (_this2.synchroniseCursors) {
              document.querySelectorAll('.typewriter-cursor').forEach(function (e) {
                e.style.animation = 'none';
                e.offsetHeight;
                e.style.animation = null;
              });
            }
          }
        }, _this2.ignoreWhitespace && /\s/.test(sequence.text[0]) ? 0 : speed);
      };

      this.writingSequences.forEach(function (sequence) {
        sequence.target.innerText = null;
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