# Typograph
A compliant JavaScript typing animation library.

## Installation

```bash
$ npm install typograph
$ yarn add typograph
```

```javascript
import Typograph from 'typograph'
```

## Usage

```javascript
new Typograph({
  target: '.typeMe',
  text: 'Type me if you can',
  speed: 150,
  fixePosition: true,
  cursor: '|',
  mistyping: true,
  mistypingRate: 2,
  callback: function() {
    this.erase({
      callback: () => {
        this.retype({
          text: 'Well done !',
          eraseBefore: true,
          eraseSpeed: 50
        });
      }
    });
  }
});
```
