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

var keyboards = {
  azerty: ['azertyuiop', 'qsdfghjklm', 'wxcvbn'],
  qwerty: ['qwertyuiop', 'asdfghjklz', 'xcvbnm']
};

var Typewriter = function () {
  function Typewriter(params) {
    _classCallCheck(this, Typewriter);

    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed / 2;
    this.humanize = params.humanize === undefined ? true : params.humanize;
    this.mistyping = params.mistyping === undefined ? false : params.mistyping;
    this.mistypingRate = params.mistypingRate === undefined ? 10 : params.mistypingRate;
    this.keyboard = params.keyboard === undefined ? keyboards['qwerty'] : keyboards[params.keyboard];
    this.fixePosition = params.fixePosition;
    this.text = params.text;
    this.ignoreWhitespace = params.ignoreWhitespace === undefined ? false : params.ignoreWhitespace;
    this.synchroniseCursors = params.synchroniseCursors === undefined ? true : params.synchroniseCursors;
    this.callback = params.callback;
    this.retyped = false;
    this.sequences = [];

    this.type();
  }

  _createClass(Typewriter, [{
    key: 'backspace',
    value: function backspace(sequence, speed, callback) {
      if (sequence.textNode.nodeValue.length) {
        setTimeout(function () {
          sequence.textNode.nodeValue = sequence.textNode.nodeValue.slice(0, -1);
          if (callback && callback instanceof Function) {
            callback.call();
          }
        }, speed || 500);
      }
    }
  }, {
    key: 'blinkCursor',
    value: function blinkCursor(sequence) {
      if (sequence.cursor) {
        sequence.cursor.classList.add('end');
        if (this.synchroniseCursors) {
          document.querySelectorAll('.typewriter-cursor').forEach(function (e) {
            e.style.animation = 'none';
            e.offsetHeight;
            e.style.animation = null;
          });
        }
      }
    }
  }, {
    key: 'erase',
    value: function erase(callback) {
      var _this = this;

      this.sequences.forEach(function (sequence) {
        _this.backspace(sequence, 1000, function () {
          _this.erase();
        });
      });
    }
  }, {
    key: 'mistype',
    value: function mistype(sequence, callback) {
      var trueChar = sequence.text[0];
      if (trueChar && !/\s/.test(trueChar)) {
        var isUpperCase = trueChar === trueChar.toUpperCase();
        trueChar = trueChar.toLowerCase();
        if (this.keyboard.join().indexOf(trueChar) >= 0) {
          var keyboardLine = this.keyboard.filter(function (e) {
            return e.indexOf(trueChar) >= 0;
          });
          if (keyboardLine.length) {
            keyboardLine = keyboardLine[0];
            var letterPosition = keyboardLine.indexOf(trueChar.toLowerCase());
            var wrongChar = !letterPosition || letterPosition + 1 === keyboardLine.length ? keyboardLine[letterPosition + (letterPosition ? -1 : 1)] : keyboardLine[letterPosition + (parseInt(Math.random() * 100 % 2) ? 1 : -1)];
            sequence.text.unshift(isUpperCase ? wrongChar.toUpperCase() : wrongChar);
            return true;
          }
        }
      } else {
        return false;
      }
    }
  }, {
    key: 'retype',
    value: function retype(text) {
      this.text = text;
      this.retyped = true;
      this.type();
    }
  }, {
    key: 'setCursor',
    value: function setCursor(target) {
      if (this.cursor) {

        var cursorStyle = '\n          @keyframes blink {\n            0% {\n              opacity: 0 }\n            50% {\n              opacity: 0 }\n            50.01% {\n              opacity: 1 }\n            100% {\n              opacity: 1 }\n          }\n\n          .typewriter-cursor.end {\n            opacity: 1;\n            animation: blink 1s infinite;\n          }';

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
    key: 'setSequences',
    value: function setSequences() {
      var _this2 = this;

      this.sequences = Array.from(document.querySelectorAll('.typeMe'), function (e) {
        var text = Array.from(_this2.text || e.dataset.type || e.textContent);
        e.innerText = null;
        return {
          target: e,
          textNode: e.appendChild(document.createTextNode('')),
          cursor: _this2.setCursor(e),
          text: text
        };
      });
    }
  }, {
    key: 'typeLetter',
    value: function typeLetter(sequence, speed, callback) {
      setTimeout(function () {
        sequence.textNode.nodeValue += sequence.text.shift();
        if (callback && callback instanceof Function) {
          callback.call();
        }
      }, speed);
    }
  }, {
    key: 'typeLetters',
    value: function typeLetters(sequence) {
      var _this3 = this;

      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.speed;
      var alreadyMistyped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var mistyped = false;
      if (this.humanize) {
        speed = Math.abs(Math.random() * this.speed + this.speed / 2);
        speed = Math.round(speed) % 2 && speed > this.speed / 0.25 ? this.speed / 2 : speed;
      }
      if (this.mistyping && !alreadyMistyped && this.mistypingRate > Math.random() * 100) {
        mistyped = this.mistype(sequence);
      }

      speed = this.ignoreWhitespace && /\s/.test(sequence.text[0]) ? 0 : speed;
      this.typeLetter(sequence, speed, function () {
        if (sequence.text.length) {
          if (mistyped) {
            _this3.backspace(sequence, 500, function () {
              _this3.mistyped = false;
              _this3.typeLetters(sequence, speed, true);
            });
          } else {
            _this3.typeLetters(sequence, speed);
          }
        } else {
          _this3.blinkCursor(sequence);
          sequence.end = true;
          if (_this3.callback && _this3.callback instanceof Function && !_this3.retyped && _this3.sequences.every(function (e) {
            return e.end;
          })) {
            _this3.callback.call(_this3);
          }
        }
      });
    }
  }, {
    key: 'type',
    value: function type() {
      var _this4 = this;

      this.setSequences();
      this.sequences.forEach(function (sequence) {
        return _this4.typeLetters(sequence);
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