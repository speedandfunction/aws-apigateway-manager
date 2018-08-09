const {join: joinPath} = require('path');
const proxyquire = require('proxyquire').noCallThru();
const {expect} = require('chai');

describe('config', () => {
  const swaggerPath = joinPath(process.cwd(), 'aws-apigateway', 'swagger.json');
  const stagesPath = joinPath(process.cwd(), 'aws-apigateway', 'stages.json');

  describe('get', () => {
    it('should throw if "restApiId" field is not specified in stages.json file', () => {
      const config = proxyquire('../../lib/config', {
        [swaggerPath]: {},
        [stagesPath]: {},
      });

      expect(() => config.get({})).to.throw('restApiId');
    });

    it('should throw if an passed stage is not defined in stages.json file', () => {
      const config = proxyquire('../../lib/config', {
        [swaggerPath]: {},
        [stagesPath]: {
          restApiId: 'someid',
        },
      });

      expect(() => config.get({stage: 'dev'})).to.throw('dev');
    });

    it('should return the config according to a stage', () => {
      const config = proxyquire('../../lib/config', {
        [swaggerPath]: {
          securityDefinitions: {
            authorizer1: {some: 'definition'},
          },
        },
        [stagesPath]: {
          restApiId: 'someid',
          dev: {
            var1: 1,
            var2: 2,
          },
        },
      });

      expect(config.get({stage: 'dev', region: 'reg1'})).to.be.eql({
        region: 'reg1',
        stage: 'dev',
        restApiId: 'someid',
        vars: {
          var1: 1,
          var2: 2,
        },
        authorizers: {
          authorizer1: {some: 'definition'},
        },
        swagger: {
          securityDefinitions: {
            authorizer1: {some: 'definition'},
          },
        },
      });
    });
  });
});
