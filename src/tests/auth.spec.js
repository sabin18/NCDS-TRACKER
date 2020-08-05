import chai from 'chai';
import chaiHttp from 'chai-http';
import app from  '../index';
import { describe, it } from 'mocha';
import userData from './mockData/userData'
import strings from '../Utils/strings'

chai.should();
chai.use(chaiHttp);

describe('auth Test',()=>{
it('user should be able to login', done => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userData.login)
      .end((error, res) => {
         res.should.have.property('status').eql(200);
         res.body.should.have.property('message').eql(strings.users.success.LOGIN_SUCCESS);
        done();
});
});

it('admin should not login with missing field', done => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send(userData.missingField)
    .end((error, res) => {
       res.should.have.property('status').eql(400);
      done();
});
});
it('user should not login without being verified', done => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send(userData.invaliLogin)
    .end((error, res) => {
       res.should.have.property('status').eql(400);
       res.body.should.have.property('Error').eql(strings.users.error.UNVERIFIED);
      done();
});
});
});