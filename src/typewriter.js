let keyboards = {
  azerty: ['azertyuiop', 'qsdfghjklm', 'wxcvbn'],
  qwerty: ['qwertyuiop', 'asdfghjklz', 'xcvbnm']
};

export default class Typewriter {

  constructor(params) {
    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed / 2;
    this.humanize = params.humanize === undefined ? true : params.humanize;
    this.mistype = params.mistype === undefined ? false : params.mistype;
    this.mistypeRate = params.mistype === undefined ? 10 : params.mistypeRate;
    this.keyboard = params.keyboard === undefined ? keyboards['qwerty'] : keyboards[params.keyboard];
    this.fixePosition = params.fixePosition;
    this.text = params.text;
    this.ignoreWhitespace = params.ignoreWhitespace === undefined ? false : params.ignoreWhitespace;
    this.synchroniseCursors = params.synchroniseCursors === undefined ? true : params.synchroniseCursors;
    this.writingSequences = this.setText();

    this.typeit();
  }

  setText () {
    return Array.from( document.querySelectorAll( '.typeMe'), e => {
      return {
        target: e,
        text: Array.from( ( e.dataset.typeit || this.text ) || e.textContent )
      }
    })
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
            animation: blink 1.2s infinite;
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

  blinkCursor ( sequence ) {
    sequence.cursor.classList.add('end');
    if ( this.synchroniseCursors ) {
      document.querySelectorAll('.typewriter-cursor').forEach( e => {
        e.style.animation = 'none'
        e.offsetHeight;
        e.style.animation = null
      });
    }
  }

  backspace (sequence, callback) {
    // setTimeout( () =>{
      sequence.textNode.nodeValue = sequence.textNode.nodeValue.slice(0,-1);
      if ( callback && callback instanceof Function ) {
        callback();
      }
    // }, 500 );
  }

  misstype (sequence, callback) {
    let trueChar = sequence.text[0];
    if ( trueChar && !/\s/.test(trueChar) ) {
      let isUpperCase = trueChar === trueChar.toUpperCase();
      trueChar = trueChar.toLowerCase();
      if ( this.keyboard.join().indexOf(trueChar) >= 0 ) {
        let keyboardLine = this.keyboard.filter( e => { return e.indexOf(trueChar) >= 0 });
        if ( keyboardLine.length ) {
          keyboardLine = keyboardLine[0];
          let letterPosition = keyboardLine.indexOf(trueChar.toLowerCase());
          let wrongChar = ((!letterPosition||letterPosition+1 === keyboardLine.length) ? keyboardLine[ letterPosition + (letterPosition ? -1:1)] : keyboardLine[letterPosition + (parseInt(Math.random()*100 % 2) ? 1 : -1)] );
          sequence.text.unshift( isUpperCase ? wrongChar.toUpperCase() : wrongChar);
          return true;
        }
      }
    }
    else {
      return false;
    }

  }

  typeLetter ( sequence, speed, callback ) {
    setTimeout( () => {
      sequence.textNode.nodeValue += sequence.text.shift();
      if( callback && callback instanceof Function ) {
        callback.call();
      }
    }, speed );
  }

  typeLetters (sequence, speed = this.speed, misstyped = false) {
    if ( this.humanize ) {
      speed = Math.abs(Math.random() * this.speed + this.speed/2);
      speed = Math.round(speed) % 2 && speed > this.speed / 0.25 ? this.speed / 2 : speed;
    }
    if ( this.mistype && !misstyped && this.mistypeRate > Math.random() * 100 ) {
      misstyped = this.misstype(sequence);
    }

    speed = this.ignoreWhitespace && /\s/.test(sequence.text[0]) ? 0 : speed;
    this.typeLetter( sequence, speed, () => {
      if ( misstyped ) {
        this.backspace( sequence );
      }
      if ( sequence.text.length ) {
        this.typeLetters(sequence, speed);
      } else if ( sequence.cursor ) {
          this.blinkCursor( sequence );
        }
    });
  }

  typeit() {
    this.writingSequences.forEach( sequence => {
      sequence.target.innerText = null;
      sequence.textNode = sequence.target.appendChild( document.createTextNode('') );
      sequence.cursor = this.setCursor( sequence.target );
      this.typeLetters( sequence );
    });
  }
}
{{}}
