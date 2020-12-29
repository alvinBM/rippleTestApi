const { RippleAPI } = require('ripple-lib');
const assert = require('assert');

const add_from = 'rphtPEN1MwzCSVAmRuc3mnduFU9TqtDgRL';
const add_to = 'rLkFkYiDz4FiBwQSPqwcQBp7RkC8ukBoLq';
const secret_from = 'ssoAMsCUeJAbXhmmxkwESAcVw6r3r';

const api = new RippleAPI({
    server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

run().catch(error => console.error(error.stack));

async function run() {
    await api.connect();

    // Ripple payments are represented as JavaScript objects
    const payment = {
        source: {
            address: add_from,
            maxAmount: {
                value: '100.00',
                currency: 'XRP'
            }
        },
        destination: {
            address: add_to,
            amount: {
                value: '100.00',
                currency: 'XRP'
            }
        }
    };

    // Get ready to submit the payment
    const prepared = await api.preparePayment(add_from, payment, {
        maxLedgerVersionOffset: 5
    });
    // Sign the payment using the sender's secret
    const { signedTransaction } = api.sign(prepared.txJSON, secret_from);
    console.log('Signed', signedTransaction)

    // Submit the payment
    const res = await api.submit(signedTransaction);

    console.log('Done', res);
    process.exit(0);
}