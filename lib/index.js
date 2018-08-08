const AWS = require('aws-sdk');
const config = require('./config');
const {ArgumentParser} = require('argparse');
const {version} = require('../package');
const {uploadSwagger} = require('./uploader');
const {addAurhorizersPermission} = require('./securityDefinitions');
const {deployStage} = require('./deploy');

const parser = new ArgumentParser({
  version,
  addHelp: true,
  description: 'AWS API Gateway manager',
});
parser.addArgument(['-r', '--region'], {
  help: 'region to deploy (ex: us-east-1)',
  required: true,
  type: String,
});
parser.addArgument(['-s', '--stage'], {
  help: 'stage to deploy (ex: dev, prod)',
  required: true,
  type: String,
});
parser.addArgument(['--accessKeyId'], {
  required: false,
  type: String,
});
parser.addArgument(['--secretAccessKey'], {
  required: false,
  type: String,
});

if (parser.accessKeyId && parser.secretAccessKey) {
  AWS.config.update({
    accessKeyId: parser.accessKeyId,
    secretAccessKey: parser.secretAccessKey,
  });
}

exports.run = async () => {
  const cfg = config.get({
    region: parser.region,
    stage: parser.region,
  });

  const MSG_SWAGGER = 'Swagger has been deployed';
  const MSG_LAMBDA = 'Lambdas have been permited';
  const MSG_STAGE = 'Stage has been deployed';

  console.time(MSG_SWAGGER);
  await uploadSwagger(cfg);
  console.timeEnd(MSG_SWAGGER);

  console.time(MSG_LAMBDA);
  await addAurhorizersPermission(cfg);
  console.timeEnd(MSG_LAMBDA);

  console.time(MSG_STAGE);
  await deployStage(cfg);
  console.timeEnd(MSG_STAGE);
};
