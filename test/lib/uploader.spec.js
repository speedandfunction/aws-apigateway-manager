const {expect} = require('chai');
const sinon = require('sinon');
const AWS = require('aws-sdk');
const {uploadSwagger} = require('../../lib/uploader');

describe('uploader', () => {
  describe('uploadSwagger', () => {
    const sandbox = sinon.createSandbox();
    let APIGatewayStub;
    let putRestApiStub;

    beforeEach(() => {
      putRestApiStub = sandbox.stub().returns({promise: sandbox.stub().resolves()});
      APIGatewayStub = sandbox.stub().returns({putRestApi: putRestApiStub});

      sandbox.stub(AWS, 'APIGateway').value(APIGatewayStub);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should upload the swagger file', async () => {
      const cfg = {
        swagger: {filed: 'some'},
        restApiId: 'id1',
      };

      await uploadSwagger(cfg);

      expect(putRestApiStub).has.been.calledOnceWithExactly({
        body: '{"filed":"some"}',
        mode: 'overwrite',
        restApiId: 'id1',
      });
    });

    it('should replace the "region" placeholder', async () => {
      const cfg = {
        swagger: {
          lambdaPath: '{{region}}:function:some-lambda',
        },
        region: 'west-1',
        restApiId: 'id1',
      };

      await uploadSwagger(cfg);

      expect(putRestApiStub).has.been.calledOnceWithExactly({
        body: '{"lambdaPath":"west-1:function:some-lambda"}',
        mode: 'overwrite',
        restApiId: 'id1',
      });
    });
  });
});
