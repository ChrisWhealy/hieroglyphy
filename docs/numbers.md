# Tricks With Number Representations

Now that we have the string representation of the digits and the letter `'e'`, we can construct strings like `'1e100'` and `'1e1000'`, which when cast to numbers would result in `1e+100` and `Infinity`.
Then, by coercing the numbers back to strings, we can obtain the characters `'y'`, `'I'` and `'+'`.

To obtain the `'+'` sign, we first need to construct the number `1e+100`.
This can be done by concatenating the characters `'1' + 'e' + '1' + '0' +'0'`, then coercing the string to a number:

```javascript
  +'1e100'          // Coerce string '1e100' -> number 1e+100
 (+'1e100')+[]      // Overload plus (1e+100)+[] -> string '1e+100'
((+'1e100')+[])[2]  // Extract character at index 2 -> '+'
```

Now using the encoded values for `'e'`, `1` and `0`:

```javascript
 +(+!![]+(!![]+[])[+!![]+!![]+!![]]+(+!![])+(+[])+(+[]))                 // Number 1e+100
 +(+!![]+(!![]+[])[+!![]+!![]+!![]]+(+!![])+(+[])+(+[]))+[]              // Coerce to string '1e100'
(+(+!![]+(!![]+[])[+!![]+!![]+!![]]+(+!![])+(+[])+(+[]))+[])[!![]+!![]]  // Extract character at index 2 -> '+'
```

If we now create the number `1e1000`, this is too large for JavaScript to store as a 64-bit floating point number, so instead, it simply returns the word `Infinity`.
This is very helpful because we now have access to the characters `'I'` and `'y'`

```javascript
 +(+!![]+(!![]+[])[+!![]+!![]+!![]]+(+!![])+(+[])+(+[])+(+[]))           // Number Infinity
 +(+!![]+(!![]+[])[+!![]+!![]+!![]]+(+!![])+(+[])+(+[])+(+[]))+[]        // Coerce to string 'Infinity'
(+(+!![]+(!![]+[])[+!![]+!![]+!![]]+(+!![])+(+[])+(+[])+(+[]))+[])[+[]]  // Extract character at index 0 -> 'I'
                                                                         // Extract character at index 7 -> 'y'
(+(+!![]+(!![]+[])[+!![]+!![]+!![]]+(+!![])+(+[])+(+[])+(+[]))+[])[!![]+!![]+!![]+!![]+!![]+!![]+!![]]
```
