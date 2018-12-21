"use strict";

const NodeServer = require("./node-server");

class NodeBlocksModule extends NodeServer {
    constructor() {
        super();
    }

    /**
     * 
     * @param {object} query - 查询参数
     * @param {string} query.id - 区块id
     * @param {number} query.height - 区块高度
     * @param {string} query.hash - 区块hash
     * 
     * @return {Promise} - 区块信息
     * 
     * @async
     */
    async getBlock(query) {
        return await this.get("/api/blocks/get", query);
    }

    /**
     * 
     * @param {object} query - 查询参数
     * @param {string} query.id - 区块id
     * @param {number} query.height - 区块高度
     * 
     * @return {Promise} - 区块信息
     * 
     * @async
     */
    async getFullBlock(query) {
        return await this.get("/api/blocks/full", query);
    }

    /**
     * 
     * @param {object} query - 查询参数
     * @param {number} query.limit - 查询区块最大数据限制
     * @param {string} query.orderBy - 结果排序
     * @param {number} query.offset - 偏移值
     * @param {string} query.generatorPublicKey - 生产者publicKey
     * @param {number} query.totalAmount - 区块总金额
     * @param {number} query.totalFee - 区块手续费总合
     * @param {number} query.reward - 区块奖励
     * @param {string} query.previousBlock - 上一个区块id
     * @param {number} query.height - 区块高度
     */
    async getBlocks(query) {
        return await this.get("/api/blocks", query);
    }

    /**
     * @returns {Promise} - 当前区块高度
     * 
     * @async
     */
    async getHeight() {
        return await this.get("/api/blocks/getHeight", null);
    }

    /**
     * @returns {Promise} - 手续费
     * 
     * @async
     */
    async getFee() {
        return await this.get("/api/blocks/getFee", null);
    }

    /**
     * @returns {Promise} - 查询的阶段
     * 
     * @async
     */
    async getMilestone() {
        return await this.get("/api/blocks/getMilestone", null);
    }

    /**
     * @returns {Promise} - 当前最新的区块奖励
     * 
     * @async
     */
    async getReward() {
        return await this.get("/api/blocks/getReward", null);
    }

    /**
     * @returns {Promise} - 当前总的发行量
     * 
     * @async
     */
    async getSupply() {
        return await this.get("/api/blocks/getSupply", null);
    }

    /**
     * @returns {Promise} - 区块链当前状态
     * 
     * @async
     */
    async getStatus() {
        return await this.get("/api/blocks/getStatus", null);
    }
}

// module.exports = NodeBlocksModule;
export default NodeBlocksModule;