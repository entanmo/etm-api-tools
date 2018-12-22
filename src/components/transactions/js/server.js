import Axios from 'axios'

let $ajax = Axios.create({
  baseURL: 'http://47.107.148.76:4096',
  timeout: '3000',
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

class Server {
  constructor() {

  }

  async get(uri) {
    return new Promise((resolve, reject) => {
      $ajax
        .get(uri)
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
      $ajax
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
      $ajax
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