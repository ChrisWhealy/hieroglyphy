# Hieroglyphy: Taking JavaScript Type Coercion to Its Illogical Conclusion

The coding in this repo is a rewrite of [Hieroglyphy](https://github.com/alcuadrado/hieroglyphy) by [Patricio Palladino](https://github.com/alcuadrado/).

I have rewritten the original functionality as an ES6 module and significantly optimised it.

This app is part of the wider investigation into encoding a JavaScript statement or program using a reduced (or possibly minimal) alphabet while still remaining `eval`able and executable.

[Other variations](https://github.com/aemkei/jsfuck) of this style of app exist that use a minimal alphabet, but in this particular case, a close-to-minimal alphabet has been chosen in which every character in a JavaScript program is encoded using some combination of at least the following 8 characters:

* The three bracket pairs `[]`, `{}` and `()`,
* The plus sign `+`, and
* The exclamation mark `!`, and
* Optionally, the digits `[0..9]` can also be included.
   By including these characters, the size of the encoded output is reduced by approximately 40%

A JavaScript statement or program so encoded can be decoded using `eval`, or executed directly.

This form of encoding was originally considered a potential attack vector for malicious code; however, given the fact that the encoded representation can always by turned back into the original JavaScript by means of a simple `eval`, this approach is unlikely to be effective against modern security software.

> ***WARNING!***<br>
> When encoded using Hieroglyphy, a JavaScript program:
>
> 1. Becomes entirely incomprehensible to humans
> 1. Swells in size by 2 or 3 orders of magnitude!
>
> Even after `gzip`ing the "hieroglyphied" script, it could still be 8 to 10 times larger than the original!

## Optional Number Encoding

To include the digits `[0..9]` in the encoding alphabet, change the constant `ENCODE_NUMBERS` from `true` to `false`.

## Usage

`hieroglyphy.mjs` is a standalone module that can be included in your larger project.

```javascript
import {
  encodeScript,
  encodeString,
  encodeNumber,
} from "./hieroglyphy.mjs"
```

## Testing in the Node REPL

You can also perform simple tests in the NodeJS REPL (where `node --version` is >= 16):

With `ENCODE_NUMBERS` switched on (the default), all numbers are encoded:

```bash
$ node
Welcome to Node.js v18.14.2.
Type ".help" for more information.
> let H = await import('./hieroglyphy.mjs')
undefined
> H.encodeNumber("1")
'+!![]'
> H.encodeNumber("99")
'+((!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+[])+(!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+[]))'
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

With `ENCODE_NUMBERS` switched off, the encoding alphabet is expanded to include the digits `[0..9]`:

```bash
$ node
Welcome to Node.js v18.14.2.
Type ".help" for more information.
> let H = await import('./hieroglyphy.mjs')
undefined
> H.encodeNumber("1")
1
> H.encodeNumber("99")
"+('9'+'9')"
> eval(H.encodeNumber("99"))
99
> H.encodeString("a")
'(+{}+[])[1]'
> H.encodeString("b")
'([]+{})[2]'
> H.encodeString("c")
'([]+{})[5]'
> H.encodeString("abc")
'(+{}+[])[1]+([]+{})[2]+([]+{})[5]'
> eval(H.encodeString("abc"))
'abc'
>
```

# How It Works

The functionality of this app is described [in this blog](https://awesome.red-badger.com/chriswhealy/hieroglyphy)
