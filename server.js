const { parse } = require('url');

const fetch = require('node-fetch');

module.exports = async function addCors(req, res) {
  const url = req.url.slice(1);
  console.log(url);
  const data = await fetch(url);
  // data.headers.forEach((value, name) => {
  //   console.log(value, name);
  // });
  res.setHeader('Access-Control-Allow-Origin', '*');
  data.body.pipe(res);
  console.log(req);
};