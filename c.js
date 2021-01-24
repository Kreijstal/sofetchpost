var ftp = require('@icetee/ftp');
 var uri = require('lil-uri')
 //var uriJs = require("uri-js")
 //var url=uri("ftp://asamblea.tech")
 function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}
async function getftpfile(url){
var c = new ftp();
return await new Promise((resolve,reject)=>{
  c.on('ready', function() {
    var p=decodeURI(uri(url).path());
    if(p[p.length-1]=="/"){                
    c.list(p,function(err, list) {
      if (err) throw err;
      //console.dir(list);
      function getlast(str){
        var parts=encodeURI(str).split("/")
        return parts.pop()||parts.pop()
      }
      c.end();
      resolve(`<!DOCTYPE html>
<html>
<head>
	<title>Index of ${p}</title>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
	<meta content="width=640, maximum-scale=4, initial-scale=1.0" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
</head>
<body>
	<h1>Index of ${p}</h1>
	<table>
		<tr>
			<th valign="top"><img alt="[ICO]" src="http://www.xray.mpe.mpg.de/icons/apache/blank.gif"></th>
			<th>Name</th>
			<th>Last modified</th>
			<th>Size</th>
			<th>Description</th>
		</tr>
		<tr>
			<th colspan="5">
				<hr>
			</th>
		</tr>
		<tr>
			<td valign="top"><img alt="[PARENTDIR]" src="http://www.xray.mpe.mpg.de/icons/apache/back.gif"></td>
			<td><a href="..">Parent Directory</a></td>
			<td>&nbsp;</td>
			<td align="right">-</td>
			<td>&nbsp;</td>
		</tr>`+
      list.map(a=>`		<tr>
			<td valign="top"><img alt="${a.type=="d"?"[DIR]":"[TXT]"}" src="http://www.xray.mpe.mpg.de/icons/apache/${a.type=="d"?"folder.gif":"text.gif"}"></td>
			<td>
				<a href="${getlast(a.name)+(a.type=="d"?"/":"")}">${a.name}</a>
			</td>
			<td align="right">${a.date.toDateString()}</td>
			<td align="right">${a.size}</td>
			<td>&nbsp;</td>
		</tr>`).join('\n')+`<tr>
			<th colspan="5">
				<hr>
			</th>
		</tr>
	</table>
	<address>
		Index made by hand :/<!--yeah this was from apache, why do you ask?-->
	</address>
</body>
</html>`)
      
      
    });
    }else{
     c.get(p, function(err, stream) {
      if (err){throw err};
      stream.once('close', function() { c.end(); });
      resolve(streamToString(stream))
    });
    }
  });
  
  c.connect(uri(url).parts);
})
}
getftpfile("ftp://asamblea.tech/\xe4").then(console.log)
 /* var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw err;
      console.dir(list);
      c.end();
    });
    /* c.get('/archivo.txt', function(err, stream) {
      if (err) throw err;
      stream.once('close', function() { c.end(); });
      (async function(){console.log("hi");const result = await streamToString(stream);console.log(result)})()
      //stream.pipe();
    });
  });
  
  c.connect(url.parts);*/

