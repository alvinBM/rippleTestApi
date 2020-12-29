ripple = require('ripple-lib')
api = new ripple.RippleAPI({ server: 'wss://s1.ripple.com' })
api.connect()

const generated = api.generateAddress()
console.log("Adresse genere : ", generated.address)
console.log("Code secret genere : ", generated.secret)