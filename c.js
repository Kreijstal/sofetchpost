const fs = require('fs');

const fetch = require('node-fetch');
const { send } = require('micro')
var uri = require('lil-uri')
const historyFilename = '.data/history.txt'
var ftp = require('@icetee/ftp');
async function execurl(url,req){
  
if(uri(url).protocol()=="ftp"){
  return new Promise((resolve,reject)=>{
      var c = new ftp();
    
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
      resolve( `<!DOCTYPE html>
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
			<th valign="top"><img alt="[ICO]" src="https://sofetchpost.glitch.me/http://www.xray.mpe.mpg.de/icons/apache/blank.gif"></th>
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
			<td valign="top"><img alt="[PARENTDIR]" src="https://sofetchpost.glitch.me/http://www.xray.mpe.mpg.de/icons/apache/back.gif"></td>
			<td><a href="..">Parent Directory</a></td>
			<td>&nbsp;</td>
			<td align="right">-</td>
			<td>&nbsp;</td>
		</tr>`+
      list.map(a=>`		<tr>
			<td valign="top"><img alt="${a.type=="d"?"[DIR]":"[TXT]"}" src="https://sofetchpost.glitch.me/http://www.xray.mpe.mpg.de/icons/apache/${a.type=="d"?"folder.gif":"text.gif"}"></td>
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
		Made with love thanks to glitch.com<!--yeah this was from apache, why do you ask?-->
	</address>
</body>
</html>`)
      //send(res,200)
      
    });
    }else{
     c.get(p, function(err, stream) {
      if (err){console.log(decodeURI(uri(url).path()),"did you really just error on me?"); throw err};
      stream.once('close', function() { c.end(); });
      resolve(stream);
    });
    }
  });
  
  c.connect(uri(url).parts);
      
    })
}
    else{
    const data = await fetch(url,{method:req.method,headers:filob(req.headers,["host","referer"]),redirect:"follow",body:req.body});
    
    return data.body;
    }

  
  
  
}
function filob(ob,f){ return Object.keys(ob).filter(a=>!f.includes(a)).reduce((obj, key) => { obj[key] = ob[key];    return obj;  }, {}) }

(async ()=>{
  await execurl("")
  
})()