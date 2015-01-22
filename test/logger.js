var tape = require('tape')
var fs = require('fs')
var path = require('path')
var logger = require('../logger')
var prehookRequest = require('./fixtures/prehook.json')
var prehookLog = fs.readFileSync(path.join(__dirname, 'fixtures', 'prehook.txt'), 'utf8')
var posthookRequest = require('./fixtures/posthook.json')
var posthookLog = fs.readFileSync(path.join(__dirname, 'fixtures', 'posthook.txt'), 'utf8')

tape('pre-hook logger produces the correct output', function(t){
  var preHookOutput = logger(prehookRequest)

  t.equal(logger(prehookRequest), prehookLog, 'pre hook log output is as expected')
  t.end()
})

tape('post-hook logger produces the correct output', function(t){
  var postHookOutput = logger(posthookRequest)

  t.equal(logger(posthookRequest), posthookLog, 'post hook log output is as expected')
  t.end()
})