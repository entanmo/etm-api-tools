"use strict";

const path = require("path");
const fs = require("fs");

const NodeGenesisAddress = require("./node-genesis-addresses");
const NodeAllAddresses = require("./node-all-addresses");
const NodeRegDelegates = require("./node-reg-delegates");
const NodeLockVote = require("./node-lockvote");
const NodeVote = require("./node-vote");

const NodeTransfer = require("./node-transfer");
const Accounts = require("./node-accounts");

class Application {
    constructor() {
        this.genesisInst = new NodeGenesisAddress();
        this.allAddrInst = new NodeAllAddresses();
        this.regDelegatesInst = new NodeRegDelegates();
        this.lockVoteInst = new NodeLockVote();
        this.voteInst = new NodeVote();
        this.transferInst = new NodeTransfer();
        this.accounts = new Accounts();
    }

    async run() {
        try {
            const genesisAddrs = await this.genesisInst.genesisAddresses();
            const allAddrs = await this.allAddrInst.allAddresses();

            const subtract = this.subtract(allAddrs, genesisAddrs);
            this.saveToFile("./output/账号信息-集合.json", subtract);
            const batchTrs = [];
            for (let k of subtract) {
                batchTrs.push({
                    recipientId: k.address,
                    amount: k.balance
                });
            }
            this.saveToFile("./output/转账信息-集合.json", batchTrs);
            return subtract.length;
        } catch (e) {
            throw e;
        }
    }

    subtract(a, b) {
        const result = [];
        for (let k of a) {
            if (b.indexOf(k.address) == -1) {
                result.push(k);
            }
        }
        return result;
    }

    saveToFile(filename, data) {
        const dirname = path.dirname(filename);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }

        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    }

    readInFile(filename){
        return JSON.parse(fs.readFileSync(filename,'utf-8'));
    }

    async createAccounts(num, filename) {
        try {
            let data = await this.accounts.create(num);
            this.saveToFile(filename, data);
            //console.log(data);
            //console.log();
        } catch (e) {
            //console.log("error:", e);
        }
    }

    getPublicKey(secret){
        return this.accounts.getPublicKey(secret);
    }

    async batchTransfer(infos) {
        try {
            for (let info of infos) {
                const trId = await this.transferInst.transfer(info.sender, info.recipient, info.amount);
                //console.log("trId:", trId);
                //console.log();
            }
        } catch (e) {
            //console.log("error:", e);
        }
    }

    async batchRegDelegates(delegates) {
        try {
            for (let dlg of delegates) {
                const trId = await this.regDelegatesInst.regDelegate(dlg.secret, dlg.username);
                //console.log("transactionId: ", trId);
                //console.log();
            }
        } catch (e) {
            //console.log("error:", e);
        }
    }

    async batchLockVotes(infos) {
        try {
            for (let info of infos) {
                const trId = await this.lockVoteInst.lockvote(info.secret, info.lockamount);
                //console.log("trId:", trId);
                //console.log();
            }
        } catch (e) {
            //console.log("error:", e);
        }
    }

    async batchVote(infos) {
        try {
            for (let info of infos) {
                const trId = await this.voteInst.vote(info.secret, info.additional, info.removal);
                //console.log("trId:", trId);
                //console.log();
            }
        } catch (e) {
            //console.log("error:", e);
        }
    }
}

// module.exports = Application;
export default Application;