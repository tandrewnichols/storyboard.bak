expect = require('indeed').expect
sinon = require('sinon')

describe 'neo4j', ->
  Given -> @cli = require('simple-cli')
  Given -> sinon.stub @cli, 'spawn'
  Given -> @grunt =
    registerMultiTask: sinon.stub()
  Given -> @context =
    async: sinon.stub()
  Given -> @cb = sinon.stub()
  Given -> @context.async.returns @cb
  Given -> @subject = require('../tasks/neo4j')

  When -> @subject @grunt
  And -> expect(@grunt.registerMultiTask).to.have.been.calledWith 'neo4j', 'A simple API for using neo4j via grunt', sinon.match.func
  And -> @grunt.registerMultiTask.getCall(0).args[2].apply @context, []
  Then -> expect(@cli.spawn).to.have.been.calledWith @grunt, @context, 'neo4j', @cb
