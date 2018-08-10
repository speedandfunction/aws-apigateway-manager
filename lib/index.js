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

  await uploadSwagger(cfg);
  await addAurhorizersPermission(cfg);
  await deployStage(cfg);
};
