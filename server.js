const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname, port=Number(process.env.PORT)||8668;
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(new URL(req.url,'http://x').pathname);
  if(p==='/')p='/index.html';
  let file=path.resolve(root,'.'+p);
  if(file.toLowerCase().indexOf(root.toLowerCase())!==0){res.writeHead(403);res.end('forbidden');return;}
  fs.readFile(file,(e,data)=>{
    if(e){res.writeHead(404);res.end('not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
    res.end(data);
  });
}).listen(port,'127.0.0.1',()=>{console.log('server on http://127.0.0.1:'+port);});
