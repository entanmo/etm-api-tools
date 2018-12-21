"use strict";

const config = require("../../config/config.json");

const internals = {
    protocol: config.protocol,
    ip: config.ip,
    port: config.port
};

const AppConfig = {
    set protocol(value) {
        internals.protocol = value;
    },

    get protocol() {
        return internals.protocol;
    },

    set ip(value) {
        internals.ip = value;
    },

    get ip() {
        return internals.ip;
    },

    set port(value) {
        internals.port = value;
    },

    get port() {
        return internals.port;
    }
};

module.exports = AppConfig;