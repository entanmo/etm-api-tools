"use strict";

const NodeServer = require("./node-server");

class NodeLockVote extends NodeServer {
    constructor() {
        super();
    }

    async lockvote(secret, lockamount) {
        const result = await this.put("/api/lockvote", {secret, args: [lockamount]});
        return result;
    }
}

// module.exports = NodeLockVote;
export default NodeLockVote;
