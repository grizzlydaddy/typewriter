export default class Typewriter {

  const keyboard = {
    azerty: [
      [...'azertyuiop'],
      [...'qsdfghjklm'],
      [...'wxcvbn']
    ],
    qwerty: [
      [...'qwertyuiop'],
      [...'asdfghjklz'],
      [...'xcvbnm']
    ]
  };

  constructor(params) {
    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed / 2;
    this.humanize = params.humanize === undefined ? true : params.humanize;
    this.mistype = params.mistype === undefined ? false : params.mistype;
    this.mistypeRate = params.mistype === undefined ? 10 : params.mistypeRate;
    this.fixePosition = params.fixePosition;
    this.text = params.text;
    this.ignoreWhitespace = params.ignoreWhitespace === undefined ? false : params.ignoreWhitespace;
    this.synchroniseCursors = params.synchroniseCursors === undefined ? true : params.synchroniseCursors;
    this.writingSequences = this.setText();


    console.log( this.writingSequences );

    this.typeit();
  }

  setText() {
    return Array.from( document.querySelectorAll( '.typeMe'), e => {
      return {
        target: e,
        text: Array.from( ( e.dataset.typeit || this.text ) || e.textContent )
      }
    })
  }

  setCursor( target ) {
    if ( this.cursor ) {

      let cursorStyle = `
          @keyframes blink {
            0% {
              opacity: 1 }
            50% {
              opacity: 0 }
            100% {
              opacity: 1 }
          }

          .typewriter-cursor.end {
            opacity: 1;
            animation: blink .7s infinite;
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

  typeit() {

    let typeLetters = ( sequence, speed = this.speed ) => {
      if( this.humanize ){
        speed = Math.abs(Math.random() * this.speed + this.speed/2);
        speed = Math.round( speed ) % 2 && speed > this.speed / 0.25 ? this.speed / 2 : speed;
      }
      if( this.mistype ){
        if( this.mistypeRate > Math.random() * 100 ){
          let trueChar = sequence.text.shift();
          if( !isNaN(parseInt(trueChar)) ){

          }
        }
      }
      setTimeout( () => {
        if( sequence.text.length ) {
          sequence.textNode.nodeValue += sequence.text.shift();
          typeLetters( sequence, speed );
        } else if ( sequence.cursor ){
          sequence.cursor.classList.add('end');
          if( this.synchroniseCursors ){
            document.querySelectorAll('.typewriter-cursor').forEach( e => {
              e.style.animation = 'none'
              e.offsetHeight;
              e.style.animation = null
            });
          }
        }
      }, this.ignoreWhitespace && /\s/.test(sequence.text[0]) ? 0 : speed );
    }

    this.writingSequences.forEach( sequence => {
      sequence.target.innerText = null;
      sequence.textNode = sequence.target.appendChild( document.createTextNode('') );
      sequence.cursor = this.setCursor( sequence.target );
      typeLetters( sequence );
    });
  }
}
{{}}
