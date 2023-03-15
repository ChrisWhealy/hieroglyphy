
# How It Works

The object of this exercise is to see if, by means of a greatly reduced alphabet, we can encode every character that might occur in a JavaScript program whilst remaining `eval`able and executable.

## The Encoding Alphabet

Many alphabets could be chosen here of varying sizes, but just for fun, we're going to restrict ourselves to the following 8 characters:

* `+` to perform arithmetic addition, coerce values to numbers, and when overloaded, to perform string concatenation.
* `!` to perform both Boolean negation and Boolean coercion.
* `[` and `]` to access array elements, objects properties, get numbers and coerce values to strings.
* `(` and `)` to call functions and avoid parsing errors.
* `{` and `}` to get `NaN` and the infamous string `[object Object]`

> ***FYI:***<br>
> This 8-character alphabet is close to minimal in size.
> A minimal alphabet can acheive the same result by dropping the use of curly braces `{}`.
>
> However, as the alphabet size drops, so the encoding length grows!

## Methodology

Using the initial set of 8 characters `+!{}[]()`, we procede as follows:

* Form the simplest JavaScript objects
* To these objects, apply various combinations of type coercion, Boolean negation and string concatenation
* If they are not already character strings, coerce the returned values to strings
* Slice up these strings to extract individual characters from which other commands can be constructed
* Progressively build up a list of characters until every numeric, alphabetic and graphic character has been encoded

Once we have a full range of encodes characters, we are then in a position to "hieroglyphy" an input string.
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
