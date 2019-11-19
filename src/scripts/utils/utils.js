// import etmjs from "etm-js";
import etmjslib from "etm-js-lib";
import config from "@/assets/ipconfig";

let Utils = {
  processString(str) {
    str = str.replace('"', "");
    return str;
  },

  processArray(str) {
    str = str.replace("，", ",");
    let arr = str.split(",");
    return arr;
  },

  processMoney(amonut) {
    return amonut * Math.pow(10, 8);
  },

  convertMoney(amount) {
    return amount / Math.pow(10, 8);
  },

  // new Date(Date.UTC(2018, 9, 12, 12, 0, 0, 0));
  convertTimeToLocal(timestamp) {
    let localTime = etmjslib.utils.slots.getRealTime(timestamp);
    return new Date(localTime).toLocaleDateString();
  },

  convertTimeToUTC(time) {
    return time;
  },

  timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },

  getAddressBySecret(secret) {
    let hash = etmjslib.crypto
      .createHash("sha256")
      .update(secret)
      .digest();
    let publicKey = etmjslib.utils.ed.MakeKeypair(hash).publicKey;
    let address = etmjslib.utils.address.generateBase58CheckAddress(publicKey);

    return address;
  },

  getAddress(publicKey) {
    let address = etmjslib.utils.address.generateBase58CheckAddress(publicKey);

    return address;
  },

  getUrl() {
    let url = localStorage.getItem("url");
    if (!url) {
      url = {
        type: config.type,
        ip: config.ip
      };
    } else {
      url = JSON.parse(url);
    }
    return url;
  }
};

export default Utils;
