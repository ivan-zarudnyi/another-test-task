process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


module.exports = {
  expect : chai.expect,
  server : require('../app'),
  chai
};