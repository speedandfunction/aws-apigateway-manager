const {AuthHandler, utils} = require('../../../index');

export default class UserHandler extends AuthHandler {
  get name() {
    // Just name to be logged
    return 'Common user handler';
  }

  get policyArn() {
    /**
     * This policy will create and cache access for current token for URI such:
     *
     * api.com/users/profile/<current_user_id>/*
     */

    const {userId} = this._tokenPayload;

    return utils.buildExecutionApiArn({path: `users/profile/${userId}/*`});
  }

  async validate() {
    const {userId} = this._tokenPayload;

    if (!userId) {
      // This error only for logging, user will see - "Unauthorized"
      throw new Error('Token must have "userId" field');
    }

    // You can check record by "userId" in your DataBase and throw to deny access
  }
}
