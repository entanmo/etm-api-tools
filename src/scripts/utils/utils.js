let Utils = {

  processString(str) {
    str = str.replace("\"", "");
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
    let startTime = new Date(Date.UTC(2018, 9, 12, 12, 0, 0, 0));
    let newTime = startTime.getTime() + timestamp * 1000;
    let time = new Date(newTime);
    let timeStr = time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8);
    return timeStr;
  },

  convertTimeToUTC(time) {
    return time;
  },


}

export default Utils;