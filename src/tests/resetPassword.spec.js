import chai from 'chai';
import chaiHttp from 'chai-http';
import app from  '../index';
import { describe, it } from 'mocha';
import userData from './mockData/userData'
import generateToken from '../helpers/generateToken';
import EmailToken from '../helpers/EmailToken';
// import strings from '../Utils/strings'

const { ResetToken } =EmailToken
let user=userData.validUser2
const userToken = generateToken(userData.userData1);
const adminToken = ResetToken(userData.adminData2);
const token = generateToken(userData.adminData2);
const invalidToken ='bvnvnvnvnvnv';
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMSwic2VuZCI6dHJ1ZSwiZW1haWwiOiJjYXJldGRldnNAZ21haWwuY29tIiwiZXhwaXJhdGlvbiI6MTU3Mjg4MDM4MywiaWF0IjoxNTcyODc2NzgzfSwiaWF0IjoxNTcyODc2NzgzLCJleHAiOjE1NzI4ODAzODN9.UShikXkyXq6AgKlaUQap646rpnfAW9HiwAzL89W8rk0";

describe('Resetpassword Test',()=>{
it("it should verify a user", done => {
    chai
      .request(app)
      .get(`/api/v1/auth/users/verify/${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("it Should send Email for resetting password", done => {
    chai
      .request(app)
      .post("/api/v1/auth/users/forgotPassword")
      .send(userData.resetLinkData)
      .end((err, res) => {
        res.should.have.property("status").eql(200);
      });
  });
  it("it Should not send Email for resetting password with Missing Email", done => {
    chai
      .request(app)
      .post("/api/v1/auth/users/forgotPassword")
      .send(userData.missingField)
      .end((err, res) => {
        res.should.have.property("status").eql(400);
        done();
      });
  });


  it("it Should  not send Email for resetting password ", done => {
    chai
      .request(app)
      .post("/api/v1/auth/users/forgotPassword")
      .send(userData.invalidEmail)
      .end((err, res) => {
        res.should.have.property("status").eql(404);
        done();
      });
  });

  it("user Should reset password", done => {
    chai
      .request(app)
      .patch(`/api/v1/auth/users/resetPassword/${adminToken}`)
      .send(userData.passwordData2)
      .end((err, res) => {
        res.should.have.property("status").eql(200);
        done();
      });
  });

  it("user Should not reset password with exist password", done => {
    chai
      .request(app)
      .patch(`/api/v1/auth/users/resetPassword/${adminToken}`)
      .send(userData.passwordData2)
      .end((err, res) => {
        res.should.have.property("status").eql(409);
        done();
      });
  });

  it("user Should not reset password with Missing password", done => {
    chai
      .request(app)
      .patch(`/api/v1/auth/users/resetPassword/${adminToken}`)
      .send(userData.Missingpassword)
      .end((err, res) => {
        res.should.have.property("status").eql(400);
        done();
      });
  });

  it("user Should not reset password with  Invalid password ", done => {
    chai
      .request(app)
      .patch(`/api/v1/auth/users/resetPassword/${adminToken}`)
      .send(userData.Invalidpassword)
      .end((err, res) => {
        res.should.have.property("status").eql(400);
        done();
      });
  });

  // it("user Should not reset password with wrong Token", done => {
  //   chai
  //     .request(app)
  //     .patch(`/api/v1/auth/users/resetPassword/${invalidToken}`)
  //     .send(userData.passwordData2)
  //     .end((err, res) => {
  //       console.log('=======>',res.body);
  //       res.should.have.property("status").eql(404);
  //       done();
  //     });
  // });
  it("user Should not reset password with wrong Token", done => {
    chai
      .request(app)
      .patch(`/api/v1/auth/users/resetPassword/${token}`)
      .send(userData.passwordData2)
      .end((err, res) => {
        res.should.have.property("status").eql(403);
        done();
      });
  });
  it("user Should not reset password with invalid Token", done => {
    chai
      .request(app)
      .patch(`/api/v1/auth/users/resetPassword/${invalidToken}`)
      .send(userData.passwordData2)
      .end((err, res) => {
        res.should.have.property("status").eql(400);
        done();
      });
  });
  it("user Should not reset password with expered Token", done => {
    chai
      .request(app)
      .patch(`/api/v1/auth/users/resetPassword/${expiredToken}`)
      .send(userData.passwordData2)
      .end((err, res) => {
        res.should.have.property("status").eql(400);
        done();
      });
  });
});
