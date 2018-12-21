"use strict";

const NodeServer = require("./node-server");

class NodeTransfer extends NodeServer {
    constructor() {
        super();
    }

    async transfer(sendder, recipient, amount) {
        let msg = {
            amount: amount * 100000000,
            recipientId: recipient,
            secret: sendder
        }
        const result = this.put("/api/transactions", msg);
        return result;
    }
}

// module.exports = NodeTransfer;
export default NodeTransfer;