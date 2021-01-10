  var Client = require('ftp');
 var uri = require('lil-uri')
 var url=uri("ftp://asamblea.tech")
  var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw err;
      console.dir(list);
      c.end();
    });
     c.get('foo.txt', function(err, stream) {
      if (err) throw err;
      stream.once('close', function() { c.end(); });
      stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
    });
  });
  
  c.connect(url.parts);