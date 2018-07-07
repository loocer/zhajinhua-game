var toolsReq={};
var filter = require('./tools/filter')
toolsReq.getSocketAddress=function(app){
  app.get('/get-socketAddress',filter.authorize,function(req,res){
    let results = {}
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     results.data ='http://' + alias.address + ':3000';  
               }  
          }  
    }  
    results.status = 2
    results.msg = '获取成功！'
    res.status(200),
    res.json(results)
  })
}
module.exports=toolsReq