ripple = require('ripple-lib')
api = new ripple.RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' })
api.connect()



const transaction = {
    "TransactionType": "Payment",
    "Account": "rphtPEN1MwzCSVAmRuc3mnduFU9TqtDgRL",
    "Amount": "5000000",
    "Destination": "rLkFkYiDz4FiBwQSPqwcQBp7RkC8ukBoLq"
}


// Continuing after connecting to the API
async function doPrepare() {
    const preparedTx = await api.prepareTransaction(transaction, {
        // Expire this transaction if it doesn't execute within ~5 minutes:
        "maxLedgerVersionOffset": 75
    })
    const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
    console.log("Prepared transaction instructions:", preparedTx.txJSON)
    console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
    console.log("Transaction expires after ledger:", maxLedgerVersion)
    return preparedTx.txJSON
}

const txJSON = JSON.stringify(doPrepare());


// Continuing from the previous step...
// const response = api.sign(txJSON, "ssoAMsCUeJAbXhmmxkwESAcVw6r3r")
// const txID = response.id
// console.log("Identifying hash:", txID)
// const txBlob = response.signedTransaction
// console.log("Signed blob:", txBlob)


// use txBlob from the previous example
async function doSubmit(txBlob) {
    const latestLedgerVersion = await api.getLedgerVersion()

    const result = await api.submit(txBlob)

    console.log("Tentative result code:", result.resultCode)
    console.log("Tentative result message:", result.resultMessage)

    // Return the earliest ledger index this transaction could appear in
    // as a result of this submission, which is the first one after the
    // validated ledger at time of submission.
    return latestLedgerVersion + 1
}

//const earliestLedgerVersion = doSubmit(txBlob)


// console.log("############ LEDGER VERSION GENERATED : ", earliestLedgerVersion);


// api.on('ledger', ledger => {
//     console.log("Ledger version", ledger.ledgerVersion, "was validated.")
//     if (ledger.ledgerVersion > maxLedgerVersion) {
//         console.log("If the transaction hasn't succeeded by now, it's expired")
//     }
// })



// Continues from previous examples.
// earliestLedgerVersion was noted when the transaction was submitted.
// txID was noted when the transaction was signed.
// async function getTransactionStatus(x) {
//     console.log("*******GET TRANSACTION STATUS********");
//     try {
//         tx = await api.getTransaction(txID, { minLedgerVersion: x })
//         console.log("Transaction result:", tx.outcome.result)
//         console.log("Balance changes:", JSON.stringify(tx.outcome.balanceChanges))
//     } catch (error) {
//         console.log("Couldn't get transaction outcome:", error)
//     }
// }


//getTransactionStatus(earliestLedgerVersion);