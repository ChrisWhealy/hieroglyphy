# Gathering functions from available characters

By combining those characters, we can only get these JavaScript functions and type names: `call`, `concat`, `constructor`, `join`, `slice` and `sort`.

Playing with our alphabet and these strings, we can get the following functions:

`Function` from `[]["sort"]["constructor"]`<br>
`Array` from `array["constructor"]`<br>
`Boolean` from `false["constructor"]`<br>
`Number` from `0["constructor"]`<br>
`Object` from `{}["constructor"]`<br>
`String` from `string["constructor"]`<br>
`Function.prototype.call` from `f["call"]`<br>
`String.prototype.concat` from `string["concat"]`<br>
`Array.prototype.slice` from `array["slice"]`<br>
`Array.prototype.join` from `array["join"]`<br>
`Array.prototype.sort` from `array["sort"]`

Unluckily, none of these functions would give us new characters, but don’t loose your hope yet!

One interesting function that becomes available is `unescape` which gives us all the ASCII characters by calling `unescape("%" + <HEX_ASCII_VALUE>)`.

All we're missing to get `unescape` is the `'p'` character.
So once again we make a trade-off, sacrificing some more portability to get it.
If we know that we are in a webpage served over HTTP or HTTPS we can assume that by casting window.location to string, and getting its third character we would obtain the precious `'p'`.

But how can we obtain the `window.location` object if we don’t have access to window yet?
Luckily JavaScript, being so permissive, would give that object by doing this:


`Function("return location")()`

And with `location` now we can have three more characters `'h'`, `'p'`, `'/'`, `escape` and `unescape` functions!

If we could get the character `'%'` we would be able to get the rest by calling `unescape("%" + <HEX_ASCII_VALUE>)`.
Luckily, escaping `'['` yields the string `'%5B'`, and from that, we can obtain the percentage sign.

Finally, all we need to transform a script into symbols, is reading it as a string, encoding it in our alphabet, and use Function as eval.
