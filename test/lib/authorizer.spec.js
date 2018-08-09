const AWS = require('aws-sdk');
const sinon = require('sinon');
const {expect} = require('chai');
const {addAurhorizersPermission} = require('../../lib/authorizer');

describe('authorizer', () => {
  describe('addAurhorizersPermission', () => {
    const sandbox = sinon.createSandbox();
    let removePermissionStub;
    let addPermissionStub;

    beforeEach(() => {
      removePermissionStub = sandbox.stub().returns({promise: sandbox.stub().resolves()});
      addPermissionStub = sandbox.stub().returns({promise: sandbox.stub().resolves()});

      const LambdaStub = sandbox.stub().returns({
        removePermission: removePermissionStub,
        addPermission: addPermissionStub,
      });

      sandbox.stub(AWS, 'Lambda').value(LambdaStub);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should skip step if there are no authorizers in swagger file', async () => {
      await expect(addAurhorizersPermission({})).to.be.fulfilled;

      expect(removePermissionStub).has.been.not.called;
      expect(addPermissionStub).has.been.not.called;
    });

    it('should reassing permission for all lambdas', async () => {
      const params = {
        region: 'reg1',
        stage: 'dev',
        restApiId: 'some-id',
        authorizers: {
          auth1: {
            'x-amazon-apigateway-authorizer': {
              authorizerUri: 'arn:aws:apigateway:{{region}}:lambda:path/arn:aws:lambda:{{region}}:some-id:function:fn-name:dev/invocations',
            },
          },
          auth2: {
            'x-amazon-apigateway-authorizer': {
              authorizerUri: 'arn:aws:apigateway:{{region}}:lambda:path/arn:aws:lambda:{{region}}:some-id:function:fn-name2:dev/invocations',
            },
          },
        },
      };

      await expect(addAurhorizersPermission(params)).to.be.fulfilled;

      expect(removePermissionStub).has.been.calledBefore(addPermissionStub);
      expect(removePermissionStub).has.been.calledWith({
        FunctionName: 'arn:aws:lambda:reg1:some-id:function:fn-name:dev',
        StatementId: 'some-idfn-namedev',
      });
      expect(removePermissionStub).has.been.calledWith({
        FunctionName: 'arn:aws:lambda:reg1:some-id:function:fn-name2:dev',
        StatementId: 'some-idfn-name2dev',
      });
      expect(addPermissionStub).has.been.calledWith({
        Action: 'lambda:InvokeFunction',
        FunctionName: 'arn:aws:lambda:reg1:some-id:function:fn-name:dev',
        Principal: 'apigateway.amazonaws.com',
        SourceArn: 'arn:aws:execute-api:reg1:some-id:some-id/*',
        StatementId: 'some-idfn-namedev',
      });
      expect(addPermissionStub).has.been.calledWith({
        Action: 'lambda:InvokeFunction',
        FunctionName: 'arn:aws:lambda:reg1:some-id:function:fn-name2:dev',
        Principal: 'apigateway.amazonaws.com',
        SourceArn: 'arn:aws:execute-api:reg1:some-id:some-id/*',
        StatementId: 'some-idfn-name2dev',
      });
    });
  });
});
