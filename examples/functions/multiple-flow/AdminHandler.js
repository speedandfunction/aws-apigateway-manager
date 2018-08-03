const {AuthHandler, utils} = require('../../../index');

export default class UserHandler extends AuthHandler {
  get name() {
    // Just name to be logged
    return 'Admin handler';
  }

  get policyArn() {
    /**
     * This policy will create and cache access for current token for URI such:
     *
     * api.com/*
     */

    return utils.buildExecutionApiArn({path: '*'});
  }
}
