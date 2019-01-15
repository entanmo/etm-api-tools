import Server from "../server";

class Transaction {
  constructor() {
    this.server = new Server();
  }

  async transfer(data) {
    return await this.server.put("/api/transactions", data);
  }

  async delegate(data) {
    return await this.server.put("/api/delegates", data);
  }

  async undelegate(data) {
    return await this.server.put("/api/delegates/undelegate", data);
  }

  async lock(data) {
    return await this.server.put("/api/lockvote", data);
  }

  async unlock(data) {
    return await this.server.put("/api/lockvote/remove", data);
  }

  async vote(data) {
    return await this.server.put("/api/accounts/delegates", data);
  }

  async freeze(data) {
    return await this.server.put("/api/transactions/delay", data);
  }

  async second(data) {
    return await this.server.put("/api/transactions/second", data);
  }

  async multi(data) {
    return await this.server.put("/api/transactions/multi", data);
  }

  async getlocks(data) {
    return await this.server.get("/api/lockvote/all", data);
  }
}

export default Transaction;
