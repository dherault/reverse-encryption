const { unicode, unicodeLookupMemory } = require('./unicode')
const unicodeLength = unicode.length
const keyLength = 512

function generateKey() {
  let key = ''

  for (let i = 0; i < keyLength; i++) {
    key += unicode[Math.floor(Math.random() * unicodeLength)]
  }

  return key
}

function encode(key, message) {
  return propagate(key, message)
}

function decode(key, message) {
  return propagate(reverse(key), message, true)
}

const codes = {
  0: (key, message) => message.reverse(),
  1: intervertPositions,
  2: (key, message) => message,
  3: (key, message) => message,
  4: (key, message) => message,
  5: (key, message) => message,
  6: (key, message) => message,
  7: (key, message) => message,
}

const nCodes = Object.keys(codes).length

function propagate(key, message, reversed = false) {
  // console.log('key, message', key, message)
  message = message.split('')

  for (const code of key) {
    const octave = Math.floor(unicodeLookupMemory[code] / unicodeLength * nCodes)
    // console.log('octave', octave, unicodeLookupMemory[code], code)
    if (octave === octave) {
      message = codes[octave](key, message, reversed)
    }
  }

  return message.join('')
}

function reverse(string) {
  return string.split('').reverse().join('')
}

function split(string, n) {
  return string
  .split('')
  .reduce((accumulator, char, i, array) => {
    if (accumulator[accumulator.length - 1].length < array.length / n) {
      accumulator[accumulator.length - 1] += char
    }
    else {
      accumulator.push(char)
    }

    return accumulator
  }, [''])
}

function intervertPositions(key, message, reversed) {
  let key1
  let key2

  if (reversed) {
    [key2, key1] = split(key, 2)
  }
  else {
    [key1, key2] = split(key, 2)
  }

  for (const char1 of key1) {
    const pos1 = Math.floor(message.length * unicodeLookupMemory[char1] / unicodeLength)

    for (const char2 of key2) {
      const pos2 = Math.floor(message.length * unicodeLookupMemory[char2] / unicodeLength)
      const [x1, x2] = [message[pos1], message[pos2]]

      ;([message[pos1], message[pos2]] = [x2, x1])
    }
  }

  return message
}

module.exports = {
  generateKey,
  encode,
  decode,
}
