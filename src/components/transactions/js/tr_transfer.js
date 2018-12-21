class Transfer {
  async transfer(sendder, recipient, amount) {
    let msg = {
      amount: amount * 100000000,
      recipientId: recipient,
      secret: sendder
    }
    const result = this.put("/api/transactions", msg);
    return result;
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

export default Transfer;