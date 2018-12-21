"use strict";

const BaseNode = require("../base/basenode");

class LockVote extends BaseNode {
    constructor() {
        super();
    }

    async lock(secret, lockamount) {
        return this.put("/api/lockvote", {secret, args: [lockamount]});
    }
}

module.exports = LockVote;