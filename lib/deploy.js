const AWS = require('aws-sdk');

exports.deployStage = ({restApiId, stage, vars}) => {
  const apiGateway = new AWS.APIGateway({apiVersion: '2015-07-09'});

  return apiGateway
    .createDeployment({restApiId, stageName: stage, variables: vars})
    .promise();
};
