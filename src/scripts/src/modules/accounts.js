"use strict";

const BaseNode = require("../base/basenode");

class Accounts extends BaseNode {
    constructor() {
        super();
    }

    async open() {

    }

    async open2() {

    }

    async getBalance() {

    }

    async getPublicKey() {
        
    }

    async generatePublicKey() {

    }

    async getDelegates() {

    }

    async getDelegatesFee() {

    }

    async addDelegates() {

    }

    async getAccount() {

    }

    async newAccount() {

    }

    async accountOnBlockchain() {

    }

    async top(offset, limit) {
        const getParams = {};
        if (limit != null) {
            getParams.limit = this._.parseInt(limit);
        }
        if (offset != null) {
            getParams.offset = this._.parseInt(offset);
        }
        return this.get("/api/accounts/top", getParams);
    }

    async count() {
        return this.get("/api/accounts/count", {});
    }
}

module.exports = Accounts;