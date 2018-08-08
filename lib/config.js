const aws = require('aws-sdk');
const {join: joinPath} = require('path');

const SWAGGER_FILE_NAME = 'swagger.json';
const STAGES_FILE_NAME = 'stages.json';
const SWAGGER_FILE_PATH = joinPath(process.cwd(), SWAGGER_FILE_NAME);
const STAGES_FILE_PATH = joinPath(process.cwd(), STAGES_FILE_NAME);

exports.get = ({stage, region, aws}) => {
  const swagger = require(SWAGGER_FILE_PATH);
  const stages = require(STAGES_FILE_PATH);
  const vars = stages[stage];
  const {securityDefinitions} = swagger;

  if (!stage.restApiId) {
    throw new Error(`"restApiId" is required field in ${STAGES_FILE_NAME} file`);
  }

  if (!vars) {
    throw new Error(`There is no declaration for "${stage}" stage`);
  }

  return {
    aws,
    vars,
    swagger,
    stage,
    region,
    securityDefinitions,
  };
};
