const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai
  .use(sinonChai)
  .use(chaiAsPromised);
