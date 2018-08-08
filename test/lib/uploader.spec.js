const {expect} = require('chai');
const sinon = require('sinon');
const AWS = require('aws-sdk');

describe('uploader', () => {
  describe('uploadSwagger', () => {
    const sandbox = sinon.sandbox.create();
    let APIGatewayStub;
    let putRestApiStub;

    beforeEach(() => {
      putRestApiStub = sandbox.stub().returns({promise: sandbox.stub().resolves()});
      APIGatewayStub = sandbox.stub().returns({putRestApiStub});

      sandbox.stub(AWS, 'APIGateway').value(APIGatewayStub);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should replace the "region" placeholder', async () => {

    });

    it('should upload the swagger file', async () => {

    });
  });
});
