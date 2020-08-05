import chai from 'chai';
import chaiHttp from 'chai-http';
import app from  '../index';
import { describe, it } from 'mocha';
import userData from './mockData/userData'
import generateToken from '../helpers/generateToken';
import strings from '../Utils/strings'

chai.should();
chai.use(chaiHttp);
let user=userData.validUser
const adminToken = generateToken(userData.adminData);
const aunothorizedToken = generateToken(userData.validUser);
const invalidToken ='bvnvnvnvnvnv';

describe('admin Test',()=>{
it('admin should view all user', done => {
    chai.request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, res) => {
         res.should.have.property('status').eql(200);
        done();
});
});

it('admin should not add new user with missing field', done => {
  chai.request(app)
    .post('/api/v1/admin/users')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(userData.User1)
    .end((error, res) => {
       res.should.have.property('status').eql(400);
      done();
});
});
it('admin should add new  user', done => {
  chai.request(app)
    .post('/api/v1/admin/users')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(user)
    .end((error, res) => {
       res.should.have.property('status').eql(200);
       res.body.should.have.property('message').eql(strings.users.success.USER_ADDED);
      done();
});
});
it('admin should not add new  user with aunothorized token', done => {
  chai.request(app)
    .post('/api/v1/admin/users')
    .set('Authorization', `Bearer ${invalidToken}`)
    .send(user)
    .end((error, res) => {
      res.should.have.property('status').eql(401);
      res.body.should.have.property('Error').eql(strings.users.error.UNABLE_TO_PROCESS);
      done();
});
});
it('admin should add new  user without invalid token', done => {
  chai.request(app)
    .post('/api/v1/admin/users')
    .set('Authorization', `Bearer ${aunothorizedToken}`)
    .send(user)
    .end((error, res) => {
       res.should.have.property('status').eql(403);
       res.body.should.have.property('Error').eql(strings.users.error.AUTHORIZED);
      done();
});
});
});