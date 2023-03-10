const concatNums = (...idxs) => idxs.map(idx => `(${numbers[idx]})`).join("+")
const concatChars = (...idxs) => idxs.map(idx => charCache[idx]).join("+")

const asPaddedHexStr = len => n => n.toString(16).padStart(len, "0")
const asHexStr2 = asPaddedHexStr(2)
const asHexStr4 = asPaddedHexStr(4)

// Create the string representations of the primitive types
const asStr = str => `${str}+[]`
const str_NaN = asStr("+{}")
const str_true = asStr("!+[]")
const str_false = asStr("![]")
const str_undefined = asStr("[][[]]")
const str_object_Object = "[]+{}"

const encodeWithPrefix = prefix => suffix => `(${prefix})[${suffix}]`
const encodeFromObj = encodeWithPrefix(str_object_Object)
const encodeFromNaN = encodeWithPrefix(str_NaN)
const encodeFromUndefined = encodeWithPrefix(str_undefined)
const encodeFromTrue = encodeWithPrefix(str_true)
const encodeFromFalse = encodeWithPrefix(str_false)

// Encoded primitive values
const _zero = "+[]"
const _one = "+!![]"

const numbers = [
  _zero,
  _one,
  `${_one + _one}`,
  `${_one + _one + _one}`,
  `${_one + _one + _one + _one}`,
  `${_one + _one + _one + _one + _one}`,
  `${_one + _one + _one + _one + _one + _one}`,
  `${_one + _one + _one + _one + _one + _one + _one}`,
  `${_one + _one + _one + _one + _one + _one + _one + _one}`,
  `${_one + _one + _one + _one + _one + _one + _one + _one + _one}`,
]

// Load character encoding cache with values whose definitions become progressively weirder as we go on...
const charCache = {
  "0": `(${asStr(numbers[0])})`,
  "1": `(${asStr(numbers[1])})`,
  "2": `(${asStr(numbers[2])})`,
  "3": `(${asStr(numbers[3])})`,
  "4": `(${asStr(numbers[4])})`,
  "5": `(${asStr(numbers[5])})`,
  "6": `(${asStr(numbers[6])})`,
  "7": `(${asStr(numbers[7])})`,
  "8": `(${asStr(numbers[8])})`,
  "9": `(${asStr(numbers[9])})`,
  " ": encodeFromObj(numbers[7]),
  "[": encodeFromObj(numbers[0]),
  "b": encodeFromObj(numbers[2]),
  "c": encodeFromObj(numbers[5]),
  "j": encodeFromObj(numbers[3]),
  "o": encodeFromObj(numbers[1]),
  "O": encodeFromObj(numbers[8]),
  "a": encodeFromNaN(numbers[1]),
  "N": encodeFromNaN(numbers[0]),
  "d": encodeFromUndefined(numbers[2]),
  "e": encodeFromUndefined(numbers[3]),
  "i": encodeFromUndefined(numbers[5]),
  "n": encodeFromUndefined(numbers[1]),
  "u": encodeFromUndefined(numbers[0]),
  "f": encodeFromFalse(numbers[0]),
  "l": encodeFromFalse(numbers[2]),
  "s": encodeFromFalse(numbers[3]),
  "r": encodeFromTrue(numbers[1]),
  "t": encodeFromTrue(numbers[0]),
}

charCache["]"] = encodeFromObj(concatChars(1, 4))

const enc_constructor = hieroglyphyString("constructor")
const encodeFromString = encodeWithPrefix(`[]+${encodeFromObj(enc_constructor)}`)

charCache["S"] = encodeFromString(numbers[9])
charCache["g"] = encodeFromString(concatNums(7, 7))

const encodeFrom1e100 = encodeWithPrefix(asStr(`+(${numbers[1]}+${concatChars("e", 1, 0, 0)})`))
charCache["+"] = encodeFrom1e100(numbers[2])

const encodeFromInfinity = encodeWithPrefix(asStr(`+(${numbers[1]}+${concatChars("e", 1, 0, 0, 0)})`))
charCache["y"] = encodeFromInfinity(numbers[7])
charCache["I"] = encodeFromInfinity(numbers[0])

const enc_toString = hieroglyphyString("toString")
charCache["h"] = `(${concatNums(9, 8)})[${enc_toString}](${concatNums(9, 9)})`
charCache["p"] = `(${concatNums(9, 9, 7)})[${enc_toString}](${concatNums(9, 9, 8)})`

const functionConstructor = `[][${hieroglyphyString("sort")}][${enc_constructor}]`
const hieroglyphyScript = src => functionConstructor + "(" + hieroglyphyString(src) + ")()"

const unescape = hieroglyphyScript("return unescape")
const escape = hieroglyphyScript("return escape")

charCache["%"] = `${escape}${encodeWithPrefix(charCache["["])(numbers[0])}`

const encodeChar = char =>
  (charCode =>
    // For 7-bit ASCII, use the unescaped sequence as this will always be shorter than the unicode sequence
    charCode < 128
      ? `${unescape}(${hieroglyphyString(`%${asHexStr2(charCode)}`)})`
      : hieroglyphyString(`\\u${asHexStr4(charCode)}`)
  )(char.charCodeAt(0))

// This function contains circular dependencies; therefore, it cannot be transformed into an arrow function as arrow
// functions are not hoisted - and hoisting is the language feature that allows us to get away with such circularity!
export function hieroglyphyString(str) {
  return [...str].map(c => { if (!charCache[c]) charCache[c] = encodeChar(c); return charCache[c] }).join("+")
}

export const hieroglyphyNumber = shouldBeNumber =>
  (n => n <= 9 ? numbers[n] : "+(" + hieroglyphyString(n.toString(10)) + ")")(+shouldBeNumber)

export {
  hieroglyphyScript,
}
