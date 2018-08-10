const AWS = require('aws-sdk');

const MSG_STAGE = 'Stage has been deployed';

exports.deployStage = async ({restApiId, stage, vars}) => {
  console.time(MSG_STAGE);

  const apiGateway = new AWS.APIGateway({apiVersion: '2015-07-09'});

  await apiGateway
    .createDeployment({restApiId, stageName: stage, variables: vars})
    .promise();

  console.timeEnd(MSG_STAGE);
};
