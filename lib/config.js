const {join: joinPath} = require('path');

const SWAGGER_FILE_NAME = 'swagger.json';
const STAGES_FILE_NAME = 'stages.json';
const CONFIGS_FOLDER_NAME = 'aws-apigateway';
const SWAGGER_FILE_PATH = joinPath(process.cwd(), CONFIGS_FOLDER_NAME, SWAGGER_FILE_NAME);
const STAGES_FILE_PATH = joinPath(process.cwd(), CONFIGS_FOLDER_NAME, STAGES_FILE_NAME);

exports.get = ({stage, region}) => {
  const swagger = require(SWAGGER_FILE_PATH);
  const stages = require(STAGES_FILE_PATH);
  const vars = stages[stage];
  const {securityDefinitions} = swagger;

  if (!stages.restApiId) {
    throw new Error(`"restApiId" is required field in ${STAGES_FILE_NAME} file`);
  }

  if (!vars) {
    throw new Error(`There is no declaration for "${stage}" stage`);
  }

  return {
    vars,
    swagger,
    stage,
    region,
    restApiId: stages.restApiId,
    authorizers: securityDefinitions,
  };
};
