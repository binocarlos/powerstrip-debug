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

    var returnBody = {
      PowerstripProtocolVersion:1
    }

    console.log('')
    console.log('-------------------------------------------');
    console.log('')
    console.log('Version:          ' + body.PowerstripProtocolVersion)
    console.log('Type:             ' + body.Type)

    /*
    
      create the response based on the type of adapter

      pre-hook:   ClientRequest -> ModifiedClientRequest
      post-hook:  ServerResponse -> ModifiedServerResponse
      
    */
    if(body.Type=='pre-hook'){

      var ClientRequest = body.ClientRequest
      var ClientRequestBody = JSON.parse(ClientRequest.Body)

      console.log('Request:')
      console.log('')
      console.log('    Method:      ' + ClientRequest.Method)
      console.log('    URL:         ' + ClientRequest.Request)
      if(ClientRequestBody){
        console.log('')
        console.log(JSON.stringify(ClientRequestBody, null, 4))
      }
      console.log('')

      returnBody.ModifiedClientRequest = ClientRequest
    }
    else if(body.Type=='post-hook'){

      var ClientRequest = body.ClientRequest
      var ClientRequestBody = JSON.parse(ClientRequest.Body)

      var ServerResponse = body.ServerResponse

      console.log('Request:')
      console.log('')
      console.log('    Method:      ' + ClientRequest.Method)
      console.log('    URL:         ' + ClientRequest.Request)
      if(ClientRequestBody){
        console.log('')
        console.log(JSON.stringify(ClientRequestBody, null, 4))
      }
      console.log('')
      console.log('Response:')
      console.log('')
      console.log('    ContentType: ' + ServerResponse.ContentType)
      console.log('    Code:        ' + ServerResponse.Code)
      console.log('')
      console.log(ServerResponse.Body)

      returnBody.ModifiedServerResponse = ServerResponse
    }
    else{
      console.log('Error:  No Type found in body')
      res.statusCode = 500;
      res.end('No Type found in body')
      return
    }
    
    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(returnBody, null, 4))
  }))
})

server.listen(args.port, function(){
  console.log('server listening on port: ' + args.port)
})