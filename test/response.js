var tape = require('tape')
var response = require('../response')
var prehookRequest = require('./fixtures/prehook.json')
var posthookRequest = require('./fixtures/posthook.json')

tape('pre-hook response is of the correct format', function(t){
  var preHookResponse = response(prehookRequest)
  t.equal(preHookResponse.PowerstripProtocolVersion, 1, 'the PowerstripProtocolVersion is 1')
  t.deepEqual(prehookRequest.ClientRequest, preHookResponse.ModifiedClientRequest, 'the ClientRequest is equal to ModifiedClientRequest')
  t.end()
})

tape('post-hook response is of the correct format', function(t){
  var postHookResponse = response(posthookRequest)

  t.equal(postHookResponse.PowerstripProtocolVersion, 1, 'the PowerstripProtocolVersion is 1')
  t.deepEqual(posthookRequest.ServerResponse, postHookResponse.ModifiedServerResponse, 'the ServerResponse is equal to ModifiedServerResponse')
  t.end()
})