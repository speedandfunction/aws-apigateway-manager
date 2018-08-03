const {MultipleAuthFlow, lambda} = require('../../../index');
const UserHandler = require('./UserHandler');
const AdminHandler = require('./AdminHandler');

export default lambda(async ({lambdaEvent, lambdaContext}) => {
  const tokenPayload = await decodeToken(lambdaEvent);

  return new MultipleAuthFlow({lambdaEvent, lambdaContext, tokenPayload})
    .useHandler(UserHandler, () => tokenPayload.role === 'USER')
    .useHandler(AdminHandler, () => tokenPayload.role === 'ADMIN')
    .createPolicy();
});

async function decodeToken(lambdaEvent) {
  // Decode token with your sercret from lambdaEvent.headers.Authorization
  // and return object with payload
  return {
    role: 'ADMIN',
    userId: '123123',
  };
}
