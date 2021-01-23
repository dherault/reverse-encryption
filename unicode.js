const unicode = []
const unicodeLookupMemory = {}

for (let i = 0x0; i < 0xffff; i += 0x0001) {
  const char = String.fromCharCode(i)

  unicodeLookupMemory[char] = unicode.push(char)
}

module.exports = {
  unicode,
  unicodeLookupMemory,
}
