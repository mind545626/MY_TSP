// const PROXY_CONFIG = [
//   {
//     "/TSPapi": {
//       "target": "http://192.0.0.1:1000/",
//       "secure": false,
//       "changeOrigin": true
//     }
//   },
//   {
//     "/TSPAPI": {
//       "target": "http://192.0.0.1:8012/",
//       "secure": false,
//       "changeOrigin": true
//     }
//   }
// ]

const PROXY_CONFIG = {
  "/TSPAPI": {
    "target": "http://192.0.0.1:1000",
    "secure": false,
    "changeOrigin": true
  }
}

module.exports = PROXY_CONFIG;

module.exports = PROXY_CONFIG; //檔案為CommonJS模組;可轉換為ES6模組
