import Server from "../server";

class QueryInfo {
  constructor() {
    this.server = new Server();
  }

  async queryblock(data) {
    return await this.server.get("/api/blocks/get", data);
  }

  async queryaccount(data) {
    return await this.server.get("/api/accounts", data);
  }

  async querytransaction(data) {
    return await this.server.get("/api/transactions/get", data);
  }

}

export default QueryInfo;