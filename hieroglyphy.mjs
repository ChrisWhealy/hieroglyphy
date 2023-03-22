// By switching off number encoding, we allow the digit characters ['0'..'9'] to be included in our encoding alphabet,
// and this reduce the encoded output size by approximately 40%
const ENCODE_NUMBERS = true

const NOT = val => `!${val}`
const asNum = val => `+${val}`
const toNum = ENCODE_NUMBERS ? v => `+(${v})` : v => +eval(v)

const EMPTY_LIST = "[]"
const EMPTY_OBJ = "{}"

const _FALSE = NOT(EMPTY_LIST)                          // ![]   -> false
const _TRUE = NOT(_FALSE)                               // !![]  -> true
const _ZERO = ENCODE_NUMBERS ? asNum(EMPTY_LIST) : '0'  // +[]   -> 0
const _ONE = ENCODE_NUMBERS ? asNum(_TRUE) : '1'        // +!![] -> 1
const _NaN = asNum(EMPTY_OBJ)                           // +{}   -> NaN (but you knew that of course...)

const toStr = val => `${val}+${EMPTY_LIST}`             // val + [] -> 'val'
const strTrue = toStr(_TRUE)
const strFalse = toStr(_FALSE)
const strNaN = toStr(_NaN)
const strUndefined = toStr(`${EMPTY_LIST}[${_ZERO}]`)   // [][+[]] -> undefined
const strObject = `${EMPTY_LIST}${_NaN}`                // []+{}   -> [object Object]

const charInString = str => idx => `(${str})[${idx}]`   // (string)[idx] -> 'char'
const extractCharFromObj = charInString(strObject)
const extractCharFromNaN = charInString(strNaN)
const extractCharFromUndefined = charInString(strUndefined)
const extractCharFromTrue = charInString(strTrue)
const extractCharFromFalse = charInString(strFalse)

const numbers =
  ENCODE_NUMBERS
    ? [...new Array(8)].reduce((acc, _, n) => (_ => acc)(acc.push(`${_TRUE + _ONE.repeat(n + 1)}`)), [_ZERO, _ONE])
    : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Start filling the character encoding cache with values whose definitions can be derived by extracting various
// characters from reserved words.
// This cache is built up progressively as later entries are constructed from earlier entries
export const charCache = {
  "0": ENCODE_NUMBERS ? `(${toStr(numbers[0])})` : '\'0\'',
  "1": ENCODE_NUMBERS ? `(${toStr(numbers[1])})` : '\'1\'',
  "2": ENCODE_NUMBERS ? `(${toStr(numbers[2])})` : '\'2\'',
  "3": ENCODE_NUMBERS ? `(${toStr(numbers[3])})` : '\'3\'',
  "4": ENCODE_NUMBERS ? `(${toStr(numbers[4])})` : '\'4\'',
  "5": ENCODE_NUMBERS ? `(${toStr(numbers[5])})` : '\'5\'',
  "6": ENCODE_NUMBERS ? `(${toStr(numbers[6])})` : '\'6\'',
  "7": ENCODE_NUMBERS ? `(${toStr(numbers[7])})` : '\'7\'',
  "8": ENCODE_NUMBERS ? `(${toStr(numbers[8])})` : '\'8\'',
  "9": ENCODE_NUMBERS ? `(${toStr(numbers[9])})` : '\'9\'',

  " ": extractCharFromObj(numbers[7]),
  "[": extractCharFromObj(numbers[0]),

  "a": extractCharFromNaN(numbers[1]),
  "b": extractCharFromObj(numbers[2]),
  "c": extractCharFromObj(numbers[5]),
  "d": extractCharFromUndefined(numbers[2]),
  "e": extractCharFromTrue(numbers[3]),
  "f": extractCharFromFalse(numbers[0]),
  "i": extractCharFromUndefined(numbers[5]),
  "j": extractCharFromObj(numbers[3]),
  "l": extractCharFromFalse(numbers[2]),
  "N": extractCharFromNaN(numbers[0]),
  "n": extractCharFromUndefined(numbers[1]),
  "O": extractCharFromObj(numbers[8]),
  "o": extractCharFromObj(numbers[1]),
  "r": extractCharFromTrue(numbers[1]),
  "s": extractCharFromFalse(numbers[3]),
  "t": extractCharFromTrue(numbers[0]),
  "u": extractCharFromUndefined(numbers[0]),
}

// Generate a concatenated string of encoded characters from the supplied list of indices into the charCache
const concatChars = (...idxs) => idxs.map(idx => charCache[idx]).join("+")

charCache["]"] = extractCharFromObj(concatChars(1, 4))

// The argument to charInString() evals to 'function String() { [native code] }' from which we can extract 'S' and 'g'
const encConstructor = concatChars('c', 'o', 'n', 's', 't', 'r', 'u', 'c', 't', 'o', 'r')
const extractCharFromFnStr = charInString(`${EMPTY_LIST}+${extractCharFromObj(encConstructor)}`)

charCache["S"] = extractCharFromFnStr(numbers[9])
charCache["g"] = extractCharFromFnStr(toNum(concatChars(1, 4)))

const extractCharFrom1e100 = charInString(toStr(toNum(`${numbers[1]}+${concatChars('e', 1, 0, 0)}`)))
charCache["+"] = extractCharFrom1e100(numbers[2])

const extractCharFromInfinity = charInString(toStr(toNum(`${numbers[1]}+${concatChars('e', 1, 0, 0, 0)}`)))
charCache["I"] = extractCharFromInfinity(numbers[0])
charCache["y"] = extractCharFromInfinity(numbers[7])

// Use Number.prototype.toString(<number base>) to generate the remaining lowercase letters of the alphabet.
// The number must be specified as the concantenation of its digits
const encToString = concatChars('t', 'o', 'S', 't', 'r', 'i', 'n', 'g')
const base36 = toNum(concatChars(3, 6))
charCache["h"] = `(${toNum(concatChars(1, 7))})[${encToString}](${base36})`
charCache["k"] = `(${toNum(concatChars(2, 0))})[${encToString}](${base36})`
charCache["m"] = `(${toNum(concatChars(2, 2))})[${encToString}](${base36})`
charCache["p"] = `(${toNum(concatChars(2, 5))})[${encToString}](${base36})`
charCache["q"] = `(${toNum(concatChars(2, 6))})[${encToString}](${base36})`
charCache["v"] = `(${toNum(concatChars(3, 1))})[${encToString}](${base36})`
charCache["w"] = `(${toNum(concatChars(3, 2))})[${encToString}](${base36})`
charCache["x"] = `(${toNum(concatChars(3, 3))})[${encToString}](${base36})`
charCache["y"] = `(${toNum(concatChars(3, 4))})[${encToString}](${base36})`
charCache["z"] = `(${toNum(concatChars(3, 5))})[${encToString}](${base36})`

// Using the function constructor we can build a function that returns a reference to the function we want to call
// []["sort"]["constructor"](<fn source code>)() -> [Function: <Fn returned by source code>]
const encSort = concatChars('s', 'o', 'r', 't')
export const encodeScript = src => `${EMPTY_LIST}[${encSort}][${encConstructor}](${encodeString(src)})()`

// []['sort']['constructor']('return unescape')() -> [Function: unescape]
const unescapeFn = encodeScript("return unescape")

// escape('[') -> '%5B' from which we can extract the percent character
charCache["%"] = `${encodeScript("return escape")}${charInString(charCache["["])(numbers[0])}`

const toHexStr = len => n => n.toString(16).padStart(len, '0')
const asEscapeSeq = charCode => `%${toHexStr(2)(charCode)}`
const asUnicodeSeq = charCode => `\\u${toHexStr(4)(charCode)}`

const encodeChar = char =>
  (charCode =>
    // For 7-bit ASCII, use the unescaped sequence as this will always be shorter than the unicode sequence
    charCode < 128
      ? `${unescapeFn}(${encodeString(asEscapeSeq(charCode))})`
      : encodeString(asUnicodeSeq(charCode))
  )(char.charCodeAt(0))

// This function contains circular references and is forward-referenced from earlier coding; therefore, it cannot be
// transformed into an arrow function as the JavaScript compiler does not hoist arrow functions - and hoisting is the
// language feature that allows us to get away with both forward references and circularity.
export function encodeString(str) {
  return [...str]
    .map(c => { if (!charCache[c]) charCache[c] = encodeChar(c); return charCache[c] })
    .join("+")
}

export const encodeNumber = maybeNum => (n => n <= 9 ? numbers[n] : `+(${encodeString(n.toString(10))})`)(+maybeNum)
