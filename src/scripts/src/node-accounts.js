"use strict";

const NodeServer = require("./node-server");

const Mnemonic = require('bitcore-mnemonic');
const crypto = require('crypto')

const ed = require('../lib/ed.js');
const AddressHelper = require("../lib/address");

class Accounts extends NodeServer {
    constructor() {
        super();
    }

    async create(num) {
        let data = {
            secrets: [],
            publicKey: [],
            address: []
        }
        for (let i = 0; i < num; i++) {
            let secret = new Mnemonic(128).toString();
            let hash = crypto.createHash('sha256').update(secret).digest();
            let keypairTemp = ed.MakeKeypair(hash);
            let publicKey = keypairTemp.publicKey.toString('hex');
            let address = AddressHelper.generateBase58CheckAddress(publicKey);

            data.secrets.push(secret);
            data.publicKey.push(publicKey);
            data.address.push(address)
        }
        return data;
    }

    getPublicKey(secret){
        let hash = crypto.createHash('sha256').update(secret).digest();
        let keypairTemp = ed.MakeKeypair(hash);
        let publicKey = keypairTemp.publicKey.toString('hex');
        return publicKey;
    }
}

// module.exports = Accounts;
export default Accounts;