const {expect} = require('chai');
const sinon = require('sinon');
const AWS = require('aws-sdk');
const {deployStage} = require('../../lib/deploy');

describe('deploy', () => {
  describe('deployStage', () => {
    it('should deploy with stage woth passed params', async () => {
      const promise = sinon.stub().resolves();
      const createDeployment = sinon.stub().returns({promise});
      const apiGatewayStubCtr = sinon.stub().returns({createDeployment});
      const apiGatewayStub = sinon.stub(AWS, 'APIGateway').value(apiGatewayStubCtr);

      await deployStage({restApiId: 10, stage: 'test', vars: {a: 20}});

      expect(createDeployment).has.been.calledWith({
        restApiId: 10,
        stageName: 'test',
        variables: {a: 20},
      });

      apiGatewayStub.restore();
    });
  });
});
