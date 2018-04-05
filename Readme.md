# Typograph


## Overview
Typographis a pure JavaScript module which allows you to simulate a typewriter effect on any text or group of text you want.
It offers a bunch of options from classic one as typing/backspacing speed, humanized speed etc. to some you won't find easily elsewhere like simulating misstyping or retyping.
You can of course use it in its simplest form by only setting you own selectors in target.

## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 6+ | 10+ | 32+ | 15+ |


## Installation

```bash
$ npm install typograph
$ yarn add typograph
```

```javascript
import Typograph from 'typograph'
```

Or manually [download](https://github.com/grizzlydaddy/typograph/archive/master.zip) and link lib/typograph.min.js in your HTML:

```javascript
<script src="typograph.min.js"></script>
```

## Usage

```javascript
new Typograph({
  target: '.typeMe',                  // Mandatory
  text: 'Type me if you can',         // Optional
  speed: 150,                         // Optional
  fixePosition: true,                 // Optional
  cursor: '|',                        // Optional
  mistyping: true,                    // Optional
  mistypingRate: 2,                   // Optional
  callback: function() {              // Optional
    this.erase({
      callback: () => {
        this.retype({
          text: 'Well done !',        // Mandatory
          eraseBefore: true,          // Optional
          eraseSpeed: 50              // Optional
        });
      }
    });
  }
});
```
