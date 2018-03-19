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

export default class Typewriter {

  constructor(params) {
    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed / 2;
    this.humanize = params.humanize === undefined ? true : params.humanize;
    this.fixePosition = params.fixePosition;
    this.text = params.text === undefined ? '' : params.text;
    this.ignoreWhitespace = params.ignoreWhitespace === undefined ? false : params.ignoreWhitespace;
    this.synchroniseCursors = params.synchroniseCursors === undefined ? true : params.synchroniseCursors;
    this.writingSequences = this.setText();

    this.typeit();
  }

  setText() {
    return Array.prototype.map.call( document.querySelectorAll( this.target ), e => {
      console.log(this);
      return {
        target: e,
        text: [...e.dataset.typeit] || [...this.text]
      };
    });
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
      sequence.textNode = sequence.target.appendChild( document.createTextNode('') );
      sequence.cursor = this.setCursor( sequence.target );
      typeLetters( sequence );
    });
  }
}
{{}}
