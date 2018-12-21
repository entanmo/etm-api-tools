"use strict";

const request = require("request");
const NodeServer = require("./node-server");

class AllAddress extends NodeServer {
    constructor() {
        super();
    }

    async allAddresses() {
        const self = this;
        return new Promise((resolve, reject) => {
            //console.log("get total number of accounts...");
            request({
                uri: self.Server + "/api/accounts/count",
                method: "GET",
                json: true,
            }, (err, response, body) => {
                if (err || response.statusCode !== 200) {
                    return reject(null);
                }
    
                const accountsCount = body.count;
                //console.log(`blockchain has ${accountsCount} account infos`);
                const allResultInfos = [];
                let requestedCount = 0;
                setImmediate(function nextTopAction() {
                    if (requestedCount >= accountsCount) {
                        //console.log(`get ${allResultInfos.length} account infos`);
                        return resolve(allResultInfos);
                    }
                    const offset = requestedCount;
                    requestedCount += 100;
                    //console.log("get accounts info from", offset);
                    request({
                        uri: self.Server + `/api/accounts/top?offset=${offset}`,
                        method: "GET",
                        json: true
                    }, (err, response, body) => {
                        if (err || response.statusCode != 200) {
                            return reject(null);
                        }
    
                        for (let info of body.accounts) {
                            allResultInfos.push({
                                address: info.address,
                                balance: info.balance / Math.pow(10, 8)
                            });
                        }
    
                        setImmediate(nextTopAction);
                    });
                });
            });
        });
    }
}

// module.exports = AllAddress;
export default AllAddress;