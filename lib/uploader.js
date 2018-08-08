const AWS = require('aws-sdk');

exports.uploadSwagger = async (cfg) => {
  const apiGateway = new AWS.APIGateway({apiVersion: '2015-07-09'});
  const body = JSON
    .stringify(cfg.swagger)
    .replace(/\{\{region\}\}/g, cfg.region);

  return apiGateway
    .putRestApi({body, restApiId: cfg.restApiId, mode: 'overwrite'})
    .promise();
};

