const { parse } = require('url');

const fetch = require('node-fetch');

module.exports = async function addCors(req, res) {
  const url = req.url.slice(1);
  console.log(url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  const data = await fetch(url);
  console.log(data.headers.raw());
  data.body.pipe(res);
  console.log('done');
};