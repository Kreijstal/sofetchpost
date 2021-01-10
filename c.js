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
  });
  
  c.connect(url.parts);