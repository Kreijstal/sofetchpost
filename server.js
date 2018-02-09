const { parse } = require('url');

const fetch = require('node-fetch');

module.exports = async function addCors(req, res) {
  const url = req.url.slice(1);
  console.log(url);
  const data = await fetch(url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  data.body.pipe(res);
  console.log(req);
};