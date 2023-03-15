# Tricks With Functions

Here, we will take advantage of the fact that a plain integer can also be treated as `Number` object.
This immediately means that certain functions will automatically be available, and as long as we have encoded all the letters that make up that function's name, we can call it.

```javascript
(17).valueOf()
17
```

## The `toString` Number Base Trick

The `Number.prototype.toString()` function can take a numeric argument in the range `2` to `36` that specifies the number base into which you'd like your number translated.

For example, we can convert `17` to a variety of number bases like this:

```javascript
(17).toString(2)    // '10001'
(17).toString(3)    // '122'
(17).toString(4)    // '101'
(17).toString(5)    // '32'
(17).toString(6)    // '25'
(17).toString(7)    // '23'
(17).toString(8)    // '21'
(17).toString(9)    // '18'
(17).toString(10)   // '17'
```

However, as soon as we specify a number base greater than 10, any single digit greater than 9 but less than the base will be represented as letter of the alphabet:

```javascript
(17).toString(11)   // '16'
(17).toString(12)   // '15'
(17).toString(13)   // '14'
(17).toString(14)   // '13'
(17).toString(15)   // '12'
(17).toString(16)   // '11'
(17).toString(17)   // '10'
(17).toString(18)   // 'h'
```

And presto!  We now have a way of generating all the letters from `'a'` to `'z'` &mdash; of course, this assumes that we first start with sufficient letters to spell the word `'toString'`.
When we invoke `toString(<number_base>)` on a number, we need ensure that the number base is large enough to return the desired letter!

For example, in base 36, 35 is `'z'`.

The only gotcha here is remembering that the number being encoded must be supplied as an integer.
So, we must encode it as the sum of digits from `'1'` to `'9'` that add up to the desired number.
So `17` is encoded as `9 + 8`.

So using our helper functions `concatNums` and `concatChars`, the letter `'h'` is encoded like this:

```javascript
// Generate a string of encoded number primitives or characters concatenated from the supplied list of indices
const concatNums = (...idxs) => idxs.map(idx => `(${numbers[idx]})`).join("+")
const concatChars = (...idxs) => idxs.map(idx => charCache[idx]).join("+")

const enc_toString = concatChars('t', 'o', 'S', 't', 'r', 'i', 'n', 'g')
const base36 = toNum(concatChars(3, 6))
charCache["h"] = `(${concatNums(9, 8)})[${enc_toString}](${base36})`
```

In other words, the above assignment translates to:

```javascript
charCache["h"] = (17)["toString"](18)
```

We can now repeat this trick as many times as needed to fill in the missing lowercase letters in our `charCache`.

## Creating a Function Generator Function

Here we need to take advantage of the fact that an empty array `[]` is a built-in JavaScript object with a known set of built-in functions.

So, this should look familiar:

```javascript
[3, 4, 2, 1].sort()  // [1, 2, 3, 4]
```

It should be no surprise to discover that calling an array's `sort()` function does exactly what it says on the tin &mdash; it returns a new array with the elements in their natural sort order.

> ***Q:*** Why did we choose the `sort` function?<br>
> ***A:*** Because it has a short name, and we already have already encoded the letters `'s'`, `'o'`, `'r'` and `'t'`

But what about this?

```javascript
[].sort              // What does this give?
```

By omitting the open/close parentheses `()` after the function name, we are no longer invoking the `sort` function; instead, what we get back is a reference to the `sort` function itself:

```javascript
[].sort              // [Function: sort]
```

And since functions are themselves objects, we can make further references to the known functions belonging to the `sort` function.
For instance:

```javascript
[].sort.constructor  // [Function: Function]
```

This might look pretty obscure, but this is actually really powerful because what we now have is a reference to the JavaScript function constructor.
In other words, this is a function that can build other functions for us &mdash; all we need to supply is the source code for the new function.

One restriction here is the fact that we must already have encoded sufficient letters to be able to spell the words in the desired source code!

In the event that we are unable to derive a particular 7-bit character from some returned keyword or string, we can generate an `unescape` function, to which we pass an encoded representation of that character's hex value.

```javascript
// functionConstructor = []['sort']['constructor']
const functionConstructor = `${EMPTY_LIST}[${concatChars('s', 'o', 'r', 't')}][${encConstructor}]`
export const encodeScript = src => `${functionConstructor}(${encodeString(src)})()`

// unescape = []['sort']['constructor']('return unescape')()
// unescape = [Function: unescape]
const unescape = encodeScript("return unescape")
```

If we encounter a Unicode character, then we must represent it using the hexadecimal form `\uXXXX`.
