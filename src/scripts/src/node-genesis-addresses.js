"use strict";

const NodeServer = require("./node-server");
const AddressHelper = require("../lib/address");

class GenesisAddresses extends NodeServer {
    constructor() {
        super();
    }

    async genesisAddresses() {
        //console.log("get genesis block full info...");
        let result = await this.get("/api/blocks/full", { height: 1 });
        if (!result.success) {
            throw new Error(result.error);
        }

        return this.filterAddressFromBlock(result.block);
    }

    filterAddressFromBlock(block) {
        const generatorPublicKey = block.generatorPublicKey;
        const generatorAddress = AddressHelper.generateBase58CheckAddress(generatorPublicKey);

        const allAddresses = [];
        allAddresses.push(generatorAddress);
        for (let tr of block.transactions) {
            allAddresses.push(tr.senderId);
            if (tr.recipientId) {
                allAddresses.push(tr.recipientId);
            }
        }

        const resultAddresses = [];
        for (let addr of allAddresses) {
            if (resultAddresses.indexOf(addr) == -1) {
                resultAddresses.push(addr);
            }
        }
        return resultAddresses;
    }
}

// module.exports = GenesisAddresses;
export default GenesisAddresses;