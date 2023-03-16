# Hieroglyphy: Taking JavaScript Type Coercion to Its Illogical Conclusion

The coding in this repo is a rewrite of [Hieroglyphy](https://github.com/alcuadrado/hieroglyphy) by [Patricio Palladino](https://github.com/alcuadrado/).

I have rewritten the original functionality as an ES6 module and significantly optimised it.

This app is part of the wider investigation into encoding a JavaScript statement or program using a reduced (or possibly minimal) alphabet while still remaining `eval`able and executable.

[Other variations](https://github.com/aemkei/jsfuck) of this style of app exist that use a minimal alphabet, but in this particular case, a close-to-minimal alphabet has been chosen in which every character in a JavaScript program is encoded using the following 8 characters:

* The three bracket pairs `[]`, `{}` and `()`,
* The plus sign `+`, and
* The exclamation mark `!`

A JavaScript statement or program so encoded can be decoded using `eval`, or executed directly.

> ***WARNING!***<br>
> When encoded using Hieroglyphy, a JavaScript program could become 2 or 3 orders of magnitude larger than the original!
>
> Even after `gzip`ing the "hieroglyphied" script, it could still be 8 to 10 times larger than the original!

## Usage

`hieroglyphy.mjs` is a standalone module that can be included in your larger project.

```javascript
import {
  encodeScript,
  encodeString,
  encodeNumber,
} from "./hieroglyphy.mjs"
```

You can also perform simple tests in the NodeJS REPL (where `node --version` is >= 18):

```bash
$ node
Welcome to Node.js v18.14.2.
Type ".help" for more information.
> let H = await import('./hieroglyphy.mjs')
undefined
> H.encodeNumber("1")
'+!![]'
> eval(H.encodeNumber("99"))
99
> H.encodeString("a")
'(+{}+[])[+!![]]'
> H.encodeString("b")
'([]+{})[!![]+!![]]'
> H.encodeString("c")
'([]+{})[!![]+!![]+!![]+!![]+!![]]'
> H.encodeString("abc")
'(+{}+[])[+!![]]+([]+{})[!![]+!![]]+([]+{})[!![]+!![]+!![]+!![]+!![]]'
> eval(H.encodeString("abc"))
'abc'
>
```

# How It Works

The functionality behind how this app works is described [here](./docs/README.md)
