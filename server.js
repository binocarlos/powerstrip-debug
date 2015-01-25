var concat = require('concat-stream')
var Logger = require('./logger')
var Response = require('./response')

module.exports = function(opts){
  opts = opts || {}
  return function(req, res){
    req.pipe(concat(function(body){
      if(!body){
        res.statusCode = 500;
        res.end('No POST body found')
        return
      }

      body = JSON.parse(body.toString())

      var response = Response(body)
      var output = Logger(body)

      if(opts.verbose){
        output += "\n\n";
        output += "-------------------------------------------\n"
        output += JSON.stringify(body, null, 4);
        output += "\n-------------------------------------------\n";
      }

      if(!response){
        console.log('Error:  No Type found in body')
        res.statusCode = 500;
        res.end('No Type found in body')
        return
      }
      
      console.log(output)
      
      res.setHeader('Content-type', 'application/json')
      res.end(JSON.stringify(response, null, 4))
    }))
  }
}