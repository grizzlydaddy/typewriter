const keyboards = {
  azerty: ['azertyuiop', 'qsdfghjklm', 'wxcvbn'],
  qwerty: ['qwertyuiop', 'asdfghjklz', 'xcvbnm'],
};

export default class Typograph {
  constructor(params) {
    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed / 2;
    this.humanize = params.humanize || true;
    this.mistyping = params.mistyping === undefined ? false : params.mistyping;
    this.mistypingRate = params.mistypingRate === undefined ? 3 : params.mistypingRate;
    this.keyboard = params.keyboard === undefined ? keyboards.qwerty : keyboards[params.keyboard];
    this.fixePosition = params.fixePosition;
    this.text = params.text;
    this.ignoreWhitespace = params.ignoreWhitespace === undefined ? false : params.ignoreWhitespace;
    this.synchroniseCursors = params.synchroniseCursors || true;
    this.callback = params.callback;
    this.retyped = false;
    this.sequences = [];

    this.type();
  }

  backspace(params) {
    const { sequence } = params;
    setTimeout(() => {
      sequence.textNode.nodeValue = sequence.textNode.nodeValue.slice(0, -1);
      if (params.erase && sequence.textNode.nodeValue.length) {
        this.backspace(params);
      } else if (params.callback instanceof Function) {
        if (!params.erase) {
          params.callback.call();
        } else if (!sequence.textNode.nodeValue.length) {
          sequence.erased = true;
          if (this.sequences.every(e => e.erased)) {
            params.callback.call(this);
          }
        }
      }
    }, params.speed || 500);
  }

  blinkCursor(sequence) {
    if (sequence.cursor) {
      sequence.cursor.classList.add('end');
      if (this.synchroniseCursors) {
        Array.from(document.querySelectorAll('.typewriter-cursor')).forEach((e) => {
          e.classList.remove('end');
          e.classList.add('end');
        });
      }
    }
  }

  erase(params) {
    this.sequences.forEach(sequence => this.backspace({
      sequence,
      speed: params.speed === undefined ? 30 : params.speed,
      erase: true,
      callback: params.callback,
    }));
  }

  mistype(sequence) {
    let trueChar = sequence.text[0];
    let mistyped = false;
    if (trueChar && !/\s/.test(trueChar)) {
      const isUpperCase = trueChar === trueChar.toUpperCase();
      trueChar = trueChar.toLowerCase();
      if (this.keyboard.join().indexOf(trueChar) >= 0) {
        const [keyboardLine] = this.keyboard.filter(e => e.indexOf(trueChar) >= 0);
        const letterPosition = keyboardLine.indexOf(trueChar.toLowerCase());
        // wrongChar = sibbling letter (ex: if t then r or y)
        // IF first or last letter of the line
        // THEN wrongChar = first letter +1 or last letter -1 (ex: if q then w or if n then b)
        let wrongChar = keyboardLine[letterPosition + (Math.round(Math.random()) ? 1 : -1)];
        if (!letterPosition || letterPosition + 1 === keyboardLine.length) {
          wrongChar = keyboardLine[letterPosition + (letterPosition ? -1 : 1)];
        }
        sequence.text.unshift(isUpperCase ? wrongChar.toUpperCase() : wrongChar);
        mistyped = true;
      }
    }
    return mistyped;
  }

  retype(params) {
    this.text = params.text;
    this.retyped = true;
    if (params.eraseBefore) {
      this.erase({
        callback: () => this.type(),
        speed: params.eraseSpeed,
      });
    } else {
      this.type();
    }
  }

  setCursor(target) {
    if (!document.querySelectorAll('.typograph_cursor').length) {
      const cursorStyle = `
        @keyframes blink {
          0% {
            opacity: 0 }
          50% {
            opacity: 0 }
          50.01% {
            opacity: 1 }
          100% {
            opacity: 1 }
        }

        .typewriter-cursor.end {
          opacity: 1;
          animation: blink 1s infinite;
        }`;

      const style = document.head.appendChild(document.createElement('style'));
      style.type = 'text/css';
      style.className = 'typograph_cursor';
      style.appendChild(document.createTextNode(cursorStyle));
    }

    const cursor = target.appendChild(document.createElement('span'));
    cursor.textContent = this.cursor;
    cursor.className = 'typewriter-cursor';
    return cursor;
  }

  getCursor() {
    const cursors = this.sequences.map(e => e.cursor);
    return cursors.length > 1 ? cursors : cursors[0];
  }

  setSequences() {
    this.sequences = Array.from(document.querySelectorAll(this.target), (e) => {
      const text = Array.from((this.text || e.dataset.typeit) || e.textContent);
      e.innerText = '';
      return {
        target: e,
        textNode: e.appendChild(document.createTextNode('')),
        cursor: this.cursor ? this.setCursor(e) : null,
        text,
      };
    });
  }

  typeLetter(sequence, speed, callback) {
    setTimeout(() => {
      sequence.textNode.nodeValue += sequence.text.shift() || '';
      if (callback instanceof Function) {
        callback.call();
      }
    }, speed);
  }

  typeLetters(sequence, speed = this.speed, alreadyMistyped = false) {
    let newSpeed = speed;
    let mistyped = false;
    if (this.humanize) {
      newSpeed = Math.round(((Math.random() * this.speed) + this.speed) / 2);
      newSpeed = newSpeed % 2 && newSpeed > this.speed / 0.25 ? this.speed / 2 : newSpeed;
    }
    if (this.mistyping && !alreadyMistyped && this.mistypingRate > Math.random() * 100) {
      mistyped = this.mistype(sequence);
    }

    newSpeed = this.ignoreWhitespace && /\s/.test(sequence.text[0]) ? 0 : newSpeed;
    this.typeLetter(sequence, newSpeed, () => {
      if (sequence.text.length) {
        if (mistyped) {
          this.backspace({
            sequence,
            speed: 500,
            callback: () => {
              this.mistyped = false;
              this.typeLetters(sequence, newSpeed, true);
            },
          });
        } else {
          this.typeLetters(sequence, newSpeed);
        }
      } else {
        sequence.end = true;
        this.blinkCursor(sequence);
        const sequencesEnded = this.sequences.every(e => e.end);
        if (this.callback instanceof Function && !this.retyped && sequencesEnded) {
          this.callback.call(this);
        }
      }
    });
  }

  type() {
    this.setSequences();
    this.sequences.forEach(sequence => this.typeLetters(sequence));
  }
}
