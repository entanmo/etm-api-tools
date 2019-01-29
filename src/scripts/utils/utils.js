import etmjs from "etm-js";
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
    return new Date(etmjs.transaction.getTime(timestamp)).toLocaleDateString();
  },

  convertTimeToUTC(time) {
    return time;
  },

  getAddressBySecret(secret) {
    "secret", console.log(secret);
    let publicKey = etmjs.crypto.getKeys(secret).publicKey;
    console.log("publicKey", publicKey.toString());
    let address = etmjs.crypto.getAddress(publicKey);
    console.log("address", address);

    return address;
  },

  getAddress(publicKey) {
    let address = etmjs.crypto.getNewAddress(publicKey);

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
