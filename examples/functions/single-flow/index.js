import {SingleAuthFlow, lambda} from '../../../index';
import UserHandler from './UserHandler';

export default lambda(async ({lambdaEvent, lambdaContext}) => {
  const tokenPayload = await decodeToken(lambdaEvent);

  return new SingleAuthFlow({lambdaEvent, lambdaContext, tokenPayload})
    .useHandler(UserHandler)
    .createPolicy();
});

async function decodeToken(lambdaEvent) {
  // Decode token with your sercret from lambdaEvent.headers.Authorization
  // and return object with payload
  return {
    userId: '12331',
  };
}
