var http = require('http')
var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    v:'verbose'
  },
  default:{
    port:80
  },
  boolean:['verbose']
})

var Server = require('./server')
var server = http.createServer(Server(args))

server.listen(args.port, function(){
  console.log('server listening on port: ' + args.port)
  if(args.verbose){
    console.log('verbose flag is on')
  }
})