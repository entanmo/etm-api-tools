"use strict";

const request = require("request");
const config = require("../config/config.json");

class NodeServer {
    constructor() {

    }

    get Server() {
        return config.protocol + config.ip + ":" + config.port;
    }

    async get(path, params) {
        const self = this;
        return new Promise((resolve, reject) => {
            request({
                uri: self.Server + path,
                method: "GET",
                json: true,
                qs: params != null ? params : undefined
            }, (err, response, body) => {
                if (err || response.statusCode != 200) {
                    return reject(err || `status code: ${response.statusCode}`);
                }

                return resolve(body);
            });
        });
    }

    async post(path, data) {
        const self = this;
        return new Promise((resolve, reject) => {
            request({
                uri: self.Server + path,
                method: "POST",
                json: data != null ? data : true                
            }, (err, response, body) => {
                if (err || response.statusCode != 200) {
                    return reject(err || `status code: ${response.statusCode}`);
                }

                return resolve(body);
            });
        });
    }

    async put(path, data) {
        const self = this;
        return new Promise((resolve, reject) => {
            request({
                uri: self.Server + path,
                method: "PUT",
                json: data != null ? data : true
            }, (err, response, body) => {
                if (err || response.statusCode != 200) {
                    return reject(err || `status code: ${response.statusCode}`);
                }
                
                return resolve(body);
            });
        });
    }
}

// module.exports = NodeServer;
export default NodeServer;