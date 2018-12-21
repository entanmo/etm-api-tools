const Transfer = require("./tr_transfer");


class Transaction {
  constructor() {
    this.Transfer = new Transfer();
  }

  async transfer(data) {
    try {
      for (let i = 0; i < data.address.length; i++) {
        await tr.transfer(data.secret, data.address[i], data.amonts[i]);
      }
    } catch (e) {

    }

    // this.$ajax
    //   .get("/api/blocks/getHeight")
    //   .then(res => {
    //     // console.log(res);
    //     this.message = JSON.stringify(res.data);
    //   })
    //   .catch(res => {
    //     this.amonts = JSON.stringify(res);
    //     // console.log(res);
    //   });
  }

}

export default Transaction;