ripple = require('ripple-lib')
api = new ripple.RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' })
api.connect()

const generated = api.generateAddress()
console.log("Adresse genere : ", generated.address)
console.log("Code secret genere : ", generated.secret)