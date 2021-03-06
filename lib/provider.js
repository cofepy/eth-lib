var request = require("xhr-request-promise");

var EthereumProvider = function EthereumProvider(url) {
    var api = {};
    var nextId = 0;
    var genPayload = function genPayload(method, params) {
        return {
            jsonrpc: "2.0",
            id: ++nextId,
            method: method,
            params: params
        };
    };

    if (/^http/.test(url)) {
        api.send = async function (method, params) {

            var answer = await request(url, {
                method: "POST",
                contentType: "application/json-rpc",
                body: JSON.stringify(genPayload(method, params))
            }).catch(e => {
                console.log(e);
            });
            var resp = JSON.parse(answer);
            // if (resp.error) {
            //     return resp.error.message;
            // } else {
            //     throw resp.result;
            // }
            if (resp.error) {
                throw resp.error.message;
            } else {
                return resp.result;
            }

        };
    };

    return api;
};

module.exports = EthereumProvider;