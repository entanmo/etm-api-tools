"use strict";

const BaseNode = require("../base/basenode");

class Delegates extends BaseNode {
    constructor() {
        super();
    }

    async getDelegates(offset) {
        return this.get("/api/delegates", {offset});
    }
}

module.exports = Delegates;