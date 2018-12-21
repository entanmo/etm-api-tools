"use strict";

const NodeServer = require("./node-server");

class NodeVote extends NodeServer {
    constructor() {
        super();
    }

    async vote(secret, additional, removal) {
        const delegates = [];
        if (additional) {
            delegates.push("+" + additional);
        }
        if (removal) {
            delegates.push("-" + removal);
        }
        const result = this.put("/api/accounts/delegates", {secret, delegates});
        return result;
    }
}

// module.exports = NodeVote;
export default NodeVote;