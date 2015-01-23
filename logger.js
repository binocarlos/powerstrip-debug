module.exports = function(body){
  var parts = [
    '',
    '-------------------------------------------',
    '',
    'Version:          ' + body.PowerstripProtocolVersion,
    'Type:             ' + body.Type
  ]

  if(body.Type=='pre-hook'){

    var ClientRequest = body.ClientRequest
    var ClientRequestBody;

    if(ClientRequest.Body){
      ClientRequestBody = typeof(ClientRequest.Body)=='string' ? JSON.parse(ClientRequest.Body) : ClientRequest.Body
    }

    parts = parts.concat([
      'Request:',
      '',
      '    Method:      ' + ClientRequest.Method,
      '    URL:         ' + ClientRequest.Request
    ])

    if(ClientRequestBody){
      parts = parts.concat([
        '',
        JSON.stringify(ClientRequestBody, null, 4)
      ])
    }

    parts.push('')
  }
  else if(body.Type=='post-hook'){

    var ClientRequest = body.ClientRequest
    var ClientRequestBody;

    if(ClientRequest.Body){
      ClientRequestBody = typeof(ClientRequest.Body)=='string' ? JSON.parse(ClientRequest.Body) : ClientRequest.Body
    }

    var ServerResponse = body.ServerResponse

    parts = parts.concat([
      'Request:',
      '',
      '    Method:      ' + ClientRequest.Method,
      '    URL:         ' + ClientRequest.Request
    ])

    if(ClientRequestBody){
      parts = parts.concat([
        '',
        JSON.stringify(ClientRequestBody, null, 4)
      ])
    }

    parts = parts.concat([
      '',
      'Response:',
      '',
      '    ContentType: ' + ServerResponse.ContentType,
      '    Code:        ' + ServerResponse.Code,
      '',
      ServerResponse.Body
    ])
    
  }
  else{
    parts.push('Error:  No Type found in body')
  }

  return parts.join("\n")
}