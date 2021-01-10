  var Client = require('ftp');
 var uri = require('lil-uri')
 var url=uri("ftp://asamblea.tech")
 function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}


  var c = new Client();
  c.on('ready', function() {
    /*c.list(function(err, list) {
      if (err) throw err;
      console.dir(list);
      c.end();
    });*/
     c.get('/t.txt', function(err, stream) {
      if (err) throw err;
      stream.once('close', function() { c.end(); });
      (async function(){console.log("hi");const result = await streamToString(stream);console.log(result)})()
      //stream.pipe();
    });
  });
  
  c.connect(url.parts);