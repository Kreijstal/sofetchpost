const fs = require('fs');

const fetch = require('node-fetch');

const historyFilename = '.data/history.txt'

const readHistory = function readHistoryFunc() {
  fs.readFile(historyFilename, (err, history) => {
    if (err) 
  });
}

module.exports = async function soFetchProxy(req, res) {
  const url = req.url.slice(1);
  if (url.length === 0) return readHistory();
  
  fs.appendFile(historyFilename, `${new Date()} ${url}`);
  const data = await fetch(url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  data.body.pipe(res);
};