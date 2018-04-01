let keyboards = {
  azerty: ['azertyuiop', 'qsdfghjklm', 'wxcvbn'],
  qwerty: ['qwertyuiop', 'asdfghjklz', 'xcvbnm']
};

export default class Typograph {

  constructor(params) {
    this.target = params.target;
    this.cursor = params.cursor ;
    this.speed = params.speed / 2;
    this.humanize = params.humanize === undefined ? true : params.humanize;
    this.mistyping = params.mistyping === undefined ? false : params.mistyping;
    this.mistypingRate = params.mistypingRate === undefined ? 3 : params.mistypingRate;
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

  backspace (params) {
    setTimeout( () =>{
      params.sequence.textNode.nodeValue = params.sequence.textNode.nodeValue.slice(0,-1);
      if( params.erase && params.sequence.textNode.nodeValue.length ) {
        this.backspace( params );
      }
      else if ( params.callback && params.callback instanceof Function ) {
        if( !params.erase ){
          params.callback.call();
        } else if( !params.sequence.textNode.nodeValue.length ) {
          params.sequence.erased = true;
          if( this.sequences.every(e => e.erased) ) {
            params.callback.call();
          }
        }
      }
    }, params.speed || 500 );
  }

  blinkCursor (sequence) {
    if ( sequence.cursor ) {
      sequence.cursor.classList.add('end');
      if ( this.synchroniseCursors ) {
        document.querySelectorAll('.typewriter-cursor').forEach( e => {
          e.style.animation = 'none'
          e.offsetHeight;
          e.style.animation = null
        });
      }
    }
  }

  erase (params) {
    this.sequences.forEach( sequence => {
        this.backspace({
          sequence,
          speed: params.speed === undefined ? 30 : params.speed,
          erase: true,
          callback: params.callback
        });
    });
  }

  mistype (sequence, callback) {
    let trueChar = sequence.text[0];
    if ( trueChar && !/\s/.test(trueChar) ) {
      let isUpperCase = trueChar === trueChar.toUpperCase();
      trueChar = trueChar.toLowerCase();
      if ( this.keyboard.join().indexOf(trueChar) >= 0 ) {
        let keyboardLine = this.keyboard.filter( e => { return e.indexOf(trueChar) >= 0 });
        if ( keyboardLine.length ) {
          keyboardLine = keyboardLine[0];
          let letterPosition = keyboardLine.indexOf(trueChar.toLowerCase());
          // IF first or last letter of the line
          // THEN wrongChar = first letter +1 or last letter -1 (ex: if q then w or if n then b)
          // ELSE wrongChar = sibbling letter (ex: if t then r or y)
          let wrongChar = ((!letterPosition||letterPosition+1 === keyboardLine.length) ? keyboardLine[ letterPosition + (letterPosition ? -1:1)] : keyboardLine[letterPosition + (Math.round(Math.random()) ? 1 : -1)] );
          sequence.text.unshift( isUpperCase ? wrongChar.toUpperCase() : wrongChar);
          return true;
        }
      }
    } else {
      return false;
    }
  }

  retype ( params ) {
    this.text = params.text;
    this.retyped = true;
    if( params.eraseBefore ){
      this.erase({
        callback: () => this.type(),
        speed: params.eraseSpeed
      });
    } else {
      this.type()
    }
  }

  setCursor (target) {
    if ( this.cursor ) {

      let cursorStyle = `
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

      let style = document.head.appendChild( document.createElement('style') );
      style.type = 'text/css';
      style.appendChild( document.createTextNode(cursorStyle) );

      let cursor = target.appendChild( document.createElement('span') );
      cursor.textContent = this.cursor;
      cursor.className = 'typewriter-cursor';
      return cursor;
    } else {
      return;
    }
  }

  getCursor () {
    let cursors = this.sequences.map( e => e.cursor );
    return cursors.length > 1 ? cursors : cursors[0];
  }

  setSequences () {
    this.sequences = Array.from( document.querySelectorAll(this.target), e => {
      let text = Array.from( ( this.text || e.dataset.typeit ) || e.textContent );
      e.innerText = null;
      return {
        target: e,
        textNode: e.appendChild( document.createTextNode('') ),
        cursor: this.setCursor( e ),
        text
      }
    });
  }

  typeLetter (sequence, speed, callback) {
    setTimeout( () => {
      sequence.textNode.nodeValue += sequence.text.shift() || '';
      if( callback && callback instanceof Function ) {
        callback.call();
      }
    }, speed );
  }

  typeLetters (sequence, speed = this.speed, alreadyMistyped = false) {
    let mistyped = false;
    if ( this.humanize ) {
      speed = Math.abs(Math.random() * this.speed + this.speed/2);
      speed = Math.round(speed) % 2 && speed > this.speed / 0.25 ? this.speed / 2 : speed;
    }
    if ( this.mistyping && !alreadyMistyped && this.mistypingRate > Math.random() * 100 ) {
      mistyped = this.mistype(sequence);
    }

    speed = this.ignoreWhitespace && /\s/.test(sequence.text[0]) ? 0 : speed;
    this.typeLetter( sequence, speed, () => {
      if ( sequence.text.length ) {
        if ( mistyped ) {
          this.backspace({
            sequence,
            speed: 500,
            callback: () => {
              this.mistyped = false;
              this.typeLetters(sequence, speed, true);
            }
          });
        } else {
          this.typeLetters(sequence, speed);
        }
      } else {
        sequence.end = true;
        this.blinkCursor( sequence );
        if ( this.callback && this.callback instanceof Function && !this.retyped && this.sequences.every(e => e.end) ) {
          this.callback.call(this);
        }
      }
    });
  }

  type() {
    this.setSequences();
    this.sequences.forEach( sequence => this.typeLetters(sequence) );
  }
}
{{}}
