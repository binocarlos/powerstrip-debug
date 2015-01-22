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
    if(!body){
      res.statusCode = 500;
      res.end('No POST body found')
      return
    }

    body = JSON.parse(body.toString())

    console.log(req.method + ' ' + req.url)
    console.dir(body)

    var returnBody = {
      PowerstripProtocolVersion:1
    }

    /*
    
      create the response based on the type of adapter

      pre-hook:   ClientRequest -> ModifiedClientRequest
      post-hook:  ServerResponse -> ModifiedServerResponse
      
    */
    if(body.Type=='pre-hook'){
      returnBody.ModifiedClientRequest = body.ClientRequest
    }
    else if(body.Type=='post-hook'){
      returnBody.ModifiedServerResponse = body.ServerResponse
    }
    else{
      res.statusCode = 500;
      res.end('No Type found in body')
      return
    }
    
    res.headers['Content-type'] = 'application/json'
    res.end(JSON.stringify(body, null, 4))
  }))
})

server.listen(args.port, function(){
  console.log('server listening on port: ' + args.port)
})