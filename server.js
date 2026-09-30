const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const server = http.createServer((req,res)=>{
  const requested = decodeURIComponent(req.url.split('?')[0]);
  const publicAsset = requested === '/manus-routes.json' || requested === '/heart-icon.svg';
  const file = path.normalize(path.join(root, publicAsset ? `public${requested}` : (requested === '/' ? 'index.html' : requested)));
  if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)});
});
server.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log(`Date Invite listening on ${process.env.PORT||3000}`));
