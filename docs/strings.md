# String Conversion

If all the operands supplied to the plus `+` operator are either numeric or can safely be interpreted numbers, then `+` performs arithmetic addition as expected.
Hence, these two statements are equivalent:

```javascript
   1 + 2 = 3
true + 2 = 3
```

However, if plus `+` is passed any non-numeric operands, then the operator is said to be "overloaded" and its behaviour switches from arithmetic addition to string concatenation.
The reason for this switch of behaviour is that JavaScript must perform type conversion that is guaranteed never to fail:

* A string does not necessarily represent a number (what is the numeric value of `'cat'`?)
* A number can always be represented a string

So `1 + '2' = '12'` and `'cat' + 3 = 'cat3'`

How does this fact help us here?

From the list of the natural numbers above, we can see that the encoded representation of integer `9` is 44 characters long, and this total will only grow larger as larger numbers are represented.

At the moment, we would have to represent `17` as the sum of seventeen `true`s:

```javascript
!![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![]   // 17
```

However, if we convert integers `1` and `7` to strings and then concatenate, we will have a shorter representation.

Given that our minimal alphabet consists only of the characters `+!(){}[]`, how do we coerce a value to a string?

The answer is to overload the plus `+` operator, thus forcing the conversion of the operands to strings.
This can be done by concatenating our numeric value to an empty list:

![Coerce String One](../img/coerce_str_1.png)

So simply by adding `+[]` to the end of each digit, we can obtain that digit's string representation:

```javascript
+[] + []                                                           // '0'
+!![] + []                                                         // '1'
!![] + !![] + []                                                   // '2'
!![] + !![] + !![] + []                                            // '3'
!![] + !![] + !![] + !![] + []                                     // '4'
!![] + !![] + !![] + !![] + !![] + []                              // '5'
!![] + !![] + !![] + !![] + !![] + !![] + []                       // '6'
!![] + !![] + !![] + !![] + !![] + !![] + !![] + []                // '7'
!![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + []         // '8'
!![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + !![] + []  // '9'
```
