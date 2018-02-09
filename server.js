const { parse } = require('url');

const fetch = require('node-fetch');

module.exports = async function addCors(req, res) {
  const params = parse(req.url, true).query;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const data = await fetch(params.url);
  data.body.pipe(res);
  console.log('done');
};