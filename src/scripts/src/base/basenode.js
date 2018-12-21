"use strict";

const request = require("request");
const _ = require("lodash");
const appConfig = require("./app-config");

class BaseNode {
    constructor() {

    }

    get _() {
        return _;
    }
    
    get server() {
        return appConfig.protocol + appConfig.ip + ":" + appConfig.port;
    }

    async get(path, params) {
        const self = this;
        return new Promise((resolve, reject) => {
            request({
                uri: self.server + path,
                method: "GET",
                json: true,
                qs: params != null ? params : undefined
            }, (err, response, body) => {
                if (err || response.statusCode != 200) {
                    return reject(err || `status code: ${response.statusCode} with ${response.statusMessage}`);
                }

                return resolve(body);
            });
        });
    }

    async post(path, data) {
        const self = this;
        return new Promise((resolve, reject) => {
            request({
                uri: self.server + path,
                method: "POST",
                json: data != null ? data : true                
            }, (err, response, body) => {
                if (err || response.statusCode != 200) {
                    return reject(err || `status code: ${response.statusCode} with ${response.statusMessage}`);
                }

                return resolve(body);
            });
        });
    }

    async put(path, data) {
        const self = this;
        return new Promise((resolve, reject) => {
            request({
                uri: self.server + path,
                method: "PUT",
                json: data != null ? data : true
            }, (err, response, body) => {
                if (err || response.statusCode != 200) {
                    return reject(err || `status code: ${response.statusCode} with ${response.statusMessage}`);
                }
                
                return resolve(body);
            });
        });
    }
}

module.exports = BaseNode;