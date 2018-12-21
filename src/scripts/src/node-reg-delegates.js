"use strict";

const request = require("request");
const NodeServer = require("./node-server");

class NodeRegDelegates extends NodeServer {
    constructor() {
        super();
    }

    async regDelegate(secret, username) {
        const self = this;
        return new Promise((resolve, reject) => {
            request({
                uri: self.Server + "/api/delegates/",
                method: "PUT",
                json: {secret, username}
            }, (err, response, body) => {
                if (err || response.statusCode != 200) {
                    return reject(err);
                }

                if (!body.success) {
                    return reject("unknown error:"+body.error);
                }

                return resolve(body.transaction.id);
            });
        });
    }
}

// module.exports = NodeRegDelegates;
export default NodeRegDelegates;