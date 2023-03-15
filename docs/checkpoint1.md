# Character Cache: First Checkpoint

So far, we are able to encode the 10 digit characters `0` to `9`, so we will place them into a character cache that so far contains:

| Character | Encoding
|---|---
| `'0'` | `+[]+[]`
| `'1'` | `+!![]+[]`
| `'2'` | `!![]+!![]+[]`
| `'3'` | `!![]+!![]+!![]+[]`
| `'4'` | `!![]+!![]+!![]+!![]+[]`
| `'5'` | `!![]+!![]+!![]+!![]+!![]+[]`
| `'6'` | `!![]+!![]+!![]+!![]+!![]+!![]+[]`
| `'7'` | `!![]+!![]+!![]+!![]+!![]+!![]+!![]+[]`
| `'8'` | `!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+[]`
| `'9'` | `!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+[]`

That's a start, but now we need to find a way to encode the letters of the alphabet.
