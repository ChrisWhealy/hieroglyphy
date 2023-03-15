# Extracting Characters from Keywords etc

Now that we have both the integers and their string representations, we can start to derive the encoding for some alphabetic characters:

***Q:*** What does JavaScript return if you access a non-existent array element?<br>
***A:*** `undefined`

Using our minimal alphabet, we can obtain the keyword `undefined` by accessing element `0` of an empty array: `[][0]`.

Further to this, we know that integer `0` is `+[]`, so we can get `undefined` from `[][+[]]`.

If we now perform the same string conversion trick as above, we can extract the letters from the character string `'undefined'`:

```javascript
// Access element zero of an empty array
[][+[]] -> undefined

// Convert the keyword to a character string
[][+[]] + [] -> 'undefined'

// Place the string in parentheses then perform array element lookup to extract individual characters
([][+[]]+[])[0]   // 'undefined[0]' -> 'u'
([][+[]]+[])[1]   // 'undefined[1]' -> 'n'
([][+[]]+[])[2]   // 'undefined[2]' -> 'd'
([][+[]]+[])[3]   // 'undefined[3]' -> 'e'
([][+[]]+[])[4]   // 'undefined[4]' -> 'f'
([][+[]]+[])[5]   // 'undefined[5]' -> 'i'
```

The only thing we need to modify here is the fact that we cannot directly use an integer as the array index.
So we need to substitute each integer for its encoded representation:

```javascript
// Substitute the integer index for the encoded integer
([][+[]]+[])[+[]]                        // 'undefined[0]' -> 'u'
([][+[]]+[])[+!![]]                      // 'undefined[1]' -> 'n'
([][+[]]+[])[!![]+!![]]                  // 'undefined[2]' -> 'd'
([][+[]]+[])[!![]+!![]+!![]]             // 'undefined[3]' -> 'e'
([][+[]]+[])[!![]+!![]+!![]+!![]]        // 'undefined[4]' -> 'f'
([][+[]]+[])[!![]+!![]+!![]+!![]+!![]]   // 'undefined[5]' -> 'i'
```

Let's now repeat the same trick, but this time, extract the characters from the values `true`, `false`, `NaN` and `[object Object]`.

```javascript
![]                              //  false
![]+[]                           // 'false'

(![]+[])[+[]]                    // 'false'[0] = 'f'
(![]+[])[+!![]]                  // 'false'[1] = 'a'
(![]+[])[!![]+!![]]              // 'false'[2] = 'l'
(![]+[])[+!![]+!![]+!![]]        // 'false'[3] = 's'
(![]+[])[+!![]+!![]+!![]+!![]]   // 'false'[4] = 'e'

!![]                             //  true
!![]+[]                          // 'true'

(!![]+[])[+[]]                   // 'true'[0] = 't'
(!![]+[])[+!![]]                 // 'true'[1] = 'r'
(!![]+[])[+!![]+!![]]            // 'true'[2] = 'u'
(!![]+[])[+!![]+!![]+!![]]       // 'true'[3] = 'e'
```

In cases where we have multiple ways to encode the same character (so far, we have three ways to encode the letter `'e'`), the shortest encoding will be used.

If we attempt to coerce an empty object `{}` to a number, we get `NaN`, which can then be converted to a string, placed in parentheses and chopped up to give us encodings for the letters `'N'` and `'a'`:

```javascript
+{}              //  NaN
+{}+[]           // 'NaN'
(+{}+[])[+[]]    // 'N'
(+{}+[])[+!![]]  // 'a'
```

Although the encoding for `'a'` derived from `'false'[1]` is the same length as the encoding derived from `'NaN'[1]`, we'll use the `'NaN'` version as the string from which the character is being obtained is shorter.

```javascript
[]+{}                                                 //  [object Object]
[]+{}+[]                                              // '[object Object]'
([]+{}+[])[+[]]                                       // '[object Object]'[0] -> '['
([]+{}+[])[+!![]]                                     // '[object Object]'[1] -> 'o'
([]+{}+[])[!![]+!![]]                                 // '[object Object]'[2] -> 'b'
([]+{}+[])[!![]+!![]+!![]]                            // '[object Object]'[3] -> 'j'
([]+{}+[])[!![]+!![]+!![]+!![]+!![]]                  // '[object Object]'[5] -> 'c'
([]+{}+[])[!![]+!![]+!![]+!![]+!![]+!![]+!![]]        // '[object Object]'[7] -> ' '
([]+{}+[])[!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]]   // '[object Object]'[8] -> 'O'

// The index to the ']' character in '[object Object]' is 14, so the encoding is shorter if the
// index is built by concatenating '1' and '4' then coercing the string to an integer
           +!![]+[]                                   // '1'
                        !![]+!![]+!![]+!![]+[]        // '4'
          (+!![]+[]) + (!![]+!![]+!![]+!![]+[])       // '1' + '4'
        +((+!![]+[]) + (!![]+!![]+!![]+!![]+[]))      // +'14' -> 14
({}+[])[+((+!![]+[]) + (!![]+!![]+!![]+!![]+[]))]     // '[object Object]'[14] -> ']'
```
