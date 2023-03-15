import {
  encodeScript,
  encodeString,
  encodeNumber,
} from "../hieroglyphy.mjs"

global.testString = "foo"

const typeOf = x => Object.prototype.toString.apply(x).slice(8).slice(0, -1)
const isOfType = t => x => typeOf(x) === t

const assert = {
  type: (val, t) => {
    if (!isOfType(t)(val)) {
      throw new Error(`Assert failed. Expected type "${val}" to be of type "${t}", instead got ${typeOf(val)}`)
    }
  },
  exactlyEquals: (expected, actual) => {
    if (actual !== expected) {
      throw new Error(`Assert failed. "${actual}" does not exactly equal "${expected}"`)
    }
  },
  coercesTo: (expected, actual) => {
    if (actual != expected) {
      throw new Error(`Assert failed. "${actual}" cannot be coerced to equal "${expected}"`)
    }
  },
}

// Test encoding of 7-bit ASCII characters
const test7BitAsciiEncoding = () => {
  for (let i = 0; i < 128; i += 1) {
    let c = String.fromCharCode(i)
    let encoded = encodeString(c)
    let evaled = eval(encoded)

    assert.coercesTo(c, evaled)
    assert.type(evaled, 'String')
  }
}

// Test encoding of numbers
const testNumberEncoding = () => {
  for (let i = 0; i < 1000; i += 1) {
    let encoded = encodeNumber(i)
    let evaled = eval(encoded)

    assert.exactlyEquals(i, evaled)
    assert.type(evaled, 'Number')
  }
}

// Test a script containing Unicode characters
const testScriptEncoding = () => {
  // A script doing something (with some unicode)
  let script = "global.testString = \"bαr\""

  assert.exactlyEquals(global.testString, "foo")
  eval(encodeScript(script))
  assert.exactlyEquals(global.testString, "bαr")
}

const testTotal = 3
let testCount = 0

try {
  testCount++
  test7BitAsciiEncoding()

  testCount++
  testNumberEncoding()

  testCount++
  testScriptEncoding()

  console.log(`✅ ${testCount} of ${testTotal} ran successfully`)
} catch (err) {
  console.error(`❌ ${testCount} of ${testTotal} tests ran`)
  console.error(err)
}
