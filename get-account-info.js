'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
    server: 'wss://s.altnet.rippletest.net:51233' // Public rippled server
});
api.connect().then(() => {
    /* begin custom code ------------------------------------ */
    const myAddress = 'rphtPEN1MwzCSVAmRuc3mnduFU9TqtDgRL';

    console.log('getting account info for', myAddress);
    return api.getAccountInfo(myAddress);

}).then(info => {
    console.log(info);
    console.log('getAccountInfo done');

    /* end custom code -------------------------------------- */
}).then(() => {
    return api.disconnect();
}).then(() => {
    console.log('done and disconnected.');
}).catch(console.error);