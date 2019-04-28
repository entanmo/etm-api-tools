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

  getAddressBySecret(secret) {
    "secret", console.log(secret);
    let publicKey = etmjslib.utils.ed.MakeKeypair(secret).publicKey;
    console.log("publicKey", publicKey.toString());
    let address = etmjslib.utils.address.generateBase58CheckAddress(publicKey);
    console.log("address", address);

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
