const _ = require('lodash');
const AWS = require('aws-sdk');
const config = require('./config');
const {uploadSwagger} = require('./uploader');
const {addAurhorizersPermission} = require('./authorizer');
const {deployStage} = require('./deploy');

exports.run = async (args) => {
  const awsConfig = _.pickBy({
    region: args.region,
    accessKeyId: args.accessKeyId,
    secretAccessKey: args.secretAccessKey,
  });

  AWS.config.update(awsConfig);

  const cfg = config.get({
    region: args.region,
    stage: args.stage,
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
