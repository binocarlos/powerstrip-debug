module.exports = function(body){
  var returnBody = {
    PowerstripProtocolVersion:1
  }

  if(body.Type=='pre-hook'){
    var ClientRequest = body.ClientRequest
    returnBody.ModifiedClientRequest = ClientRequest
  }
  else if(body.Type=='post-hook'){
    var ServerResponse = body.ServerResponse
    returnBody.ModifiedServerResponse = ServerResponse
  }
  else{
    return null
  }

  return returnBody
}