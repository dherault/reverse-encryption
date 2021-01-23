const {
  generateKey,
  encode,
  decode,
} = require('.')

const key = generateKey()

console.log('key', key)

const message = 'Plan Prepare for the move by setting performance baselines, identifying dependencies, and prioritizing your migration order. Migrate What you need to measure before, during, and after the move, so you can ensure success at every step. Run Maintain and optimize your cloud apps and infrastructure by instrumenting everything.'

const encoded = encode(key, message)

console.log('_______')
console.log('encoded', encoded)

const decoded = decode(key, encoded)

console.log('decoded', decoded)
