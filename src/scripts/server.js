import Axios from "axios";
import utils from "@/scripts/utils/utils.js"

class Server {
  constructor() {
    let url = utils.getUrl();
    this.$ajax = Axios.create({
      // baseURL: "http://47.110.42.170:4098",39.98.65.187:5000
      // baseURL: 'http://47.107.148.76:4096',
      // baseURL: 'http://localhost:4096',
      baseURL: url.type + url.ip,
      timeout: "6000",
      headers: {
        "X-Custom-Header": "foobar"
      }
    });
  }

  async get(uri, data) {
    return new Promise((resolve, reject) => {
      this.$ajax
        .get(uri, {
          params: data
        })
        .then(res => {
          return resolve(res.data);
        })
        .catch(res => {
          return reject(res.data);
        });
    });
  }

  async post(uri, data) {
    return new Promise((resolve, reject) => {
      this.$ajax
        .post(uri, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(res => {
          return reject(res.data);
        });
    });
  }

  async put(uri, data) {
    return new Promise((resolve, reject) => {
      this.$ajax
        .put(uri, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(res => {
          return reject(res.data);
        });
    });
  }
}

export default Server;