var http = require('http')
var concat = require('concat-stream')
var args = require('minimist')(process.argv, {
  alias:{
    p:'port'
  },
  default:{
    port:80
  }
})

var server = http.createServer(function(req, res){
  req.pipe(concat(function(body){
    body = JSON.parse(body.toString())
    console.log(body)
    res.end(JSON.stringify(body, null, 4))
  }))
})

server.listen(args.port, function(){
  console.log('server listening on port: ' + args.port)
})