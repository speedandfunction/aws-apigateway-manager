const AWS = require('aws-sdk');

const MSG_SWAGGER = 'Swagger has been deployed';

exports.uploadSwagger = async (cfg) => {
  console.time(MSG_SWAGGER);

  const apiGateway = new AWS.APIGateway({apiVersion: '2015-07-09'});
  const body = JSON
    .stringify(cfg.swagger)
    .replace(/\{\{region\}\}/g, cfg.region);

  await apiGateway
    .putRestApi({body, restApiId: cfg.restApiId, mode: 'overwrite'})
    .promise();

  console.timeEnd(MSG_SWAGGER);
};

