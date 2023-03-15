
# How It Works

The object of this exercise is to see if we can encode every character than might occur in a JavaScript program using a greatly reduced alphabet.

## The Encoding Alphabet

Many alphabets could be chosen here of varying sizes, but just for fun, we're going to use only the following 8 characters:

* `+` to perform arithmetic addition, coerce values to numbers, and when overloaded, to perform string concatenation.
* `!` to perform both Boolean negation and Boolean coercion.
* `[` and `]` to access array elements, objects properties, get numbers and coerce values to strings.
* `(` and `)` to call functions and avoid parsing errors.
* `{` and `}` to get `NaN` and the infamous string `[object Object]`

***FYI:***<br>
This 8-character alphabet is close to minimal in size.
A minimal alphabet needs only 6 characters because it drops the use of curly braces `{}`.

## Methodology

Using the initial set of 8 characters `+!{}[]()`, we form the simplest JavaScript objects to which we apply various combinations of type coercion, Boolean negation and string concatenation.
We then treat the returned values as strings and slice them up in order to retrieve the individual characters.
Using these characters, we then construct new commands that give responses containing other letters &ndash; and so on until we have progressively built up the full range of numeric, alphabetic and graphic characters.

Once we are able to encode the full range of characters, we are then in a position to "hieroglyphy" an input string.
The resulting (***very*** long) output can either be turned back into the original JavaScript code by running it through `eval`, or simply executed directly.

# Table of Contents

* [Pulling Ourselves Up By Our Bootstraps](./bootstraps.md)
* [Pulling Some Strings](./strings.md)
* [What Have We Achieved So Far?](./checkpoint1.md)
* [Extracting Characters From Keywords](./keywords.md)
* [Tricks With Big Numbers](./numbers.md)
* [So Where Are We Now?](./checkpoint2.md)
* [Tricks With Functions](./functions.md)

# Room from improvement

Both this article and Hieroglyphy are just proof of concepts, there is plenty of room from improvements:

* Once we were able to generate all ASCII characters, more effort needs to be made to ensure we get the shortest representation.
* When targeting modern browsers only, `btoa` would be a great help yielding lots of characters in shorter sequences.
* Depending on the target, one may select a bigger alphabet for reducing the encoding size.
* If we know the domain where the script would be run, more characters can be derived from it.
