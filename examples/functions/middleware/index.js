const {
  SingleAuthFlow,
  lambda,
  middlewares,
} = require('../../../index');
const UserHandler = require('./UserHandler');

// This middleware allow us to decode lambda VENV and pass it via lambdaContext
const kmsMiddleware = middlewares.kms(['MONGO_USER', 'MONGO_PASS']);

export default lambda(async ({lambdaEvent, lambdaContext}) => {
  // lambdaContext.kms will has decoded "MONGO_USER" and "MONGO_PASS"
  // so that we can connect to MongoDB to be able to check user access in "UserHandler"
  const tokenPayload = await decodeToken(lambdaEvent);

  return new SingleAuthFlow({lambdaEvent, lambdaContext, tokenPayload})
    .useHandler(UserHandler)
    .createPolicy();
}, [kmsMiddleware]);

async function decodeToken(lambdaEvent) {
  // Decode token with your sercret from lambdaEvent.headers.Authorization
  // and return object with payload
  return lambdaEvent;
}
