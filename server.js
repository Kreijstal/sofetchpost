const fs = require('fs');

const fetch = require('node-fetch');
const { send } = require('micro')

const historyFilename = '.data/history.txt'

const readHistory = function readHistoryFunc(res) {
  fs.readFile(historyFilename, 'utf8', (err, history) => {
    if (err) send(res, 500);
    res.setHeader('Content-type', 'text/plain; charset=utf-8');
    const lastFifty = history.split('\n').slice(-50).reverse().join('\n'); // TK make more efficient? (fs.stat, just read end of file)
    send(res, 200, lastFifty);
  });
}
var objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )
function filob(ob,f){ return Object.keys(ob).filter(a=>!f.includes(a)).reduce((obj, key) => { obj[key] = ob[key];    return obj;  }, {}) }
module.exports = async function soFetchProxy(req, res) {
  const url = req.url.slice(1);
  if (url.length === 0) return readHistory(res);
  console.log(req.url)
  console.log(JSON.stringify(req.headers))
  //res.write(JSON.stringify(req.method))
  //res.write(JSON.stringify(Object.getOwnPropertyNames(req.headers)))
  try {
    const data = await fetch(url,{method:req.method,headers:filob(req.headers,["host","referer"]),redirect:"follow",body:req.body});
    fs.appendFile(historyFilename, `${new Date()} 🚋 ${url}\n`, () => {}); // empty callback 🤷‍♀️
    res.setHeader('Access-Control-Allow-Origin', '*');
    data.body.pipe(res);
  } catch (err) {
    console.log(err)
    send(res, 404); // e.g. https://sofetch.glitch.me/favicon.ico or https://sofetch.glitch.me/https://sdjflskdjfklsdjflk.com
  }
  //res.close()
};