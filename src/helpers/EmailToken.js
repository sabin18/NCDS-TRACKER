import JWT from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import models from '../database/models'
import dotenv from 'dotenv';
import strings from '../Utils/strings';
import responseUtil from '../Utils/responseUtil'

dotenv.config();

const { ErrorResponse } = responseUtil;

const ResetToken = user => {
    const token = JWT.sign(
      {
        payload: {
          id: user.id,
          send: true,
          email: user.email,
          expiration: moment()
            .add(1, 'hour')
            .unix(),
          iat: moment().unix(),
        },
      }, process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    return token;
  };


  const UseraccessRequired = async (req, res) => {
    const { token } = req.params;
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
  
    try {
      await models.Users.findOne({ where: { id: decodedToken.payload.id } })
        .then(user => {
          const now = moment().unix();
          if (now > decodedToken.payload.expiration) {
            return ErrorResponse(res, 400, strings.users.error.EXPERED);
          }
          if (!user || decodedToken.payload.send !== true) {
            return ErrorResponse(res, 403, strings.users.error.AUTHORIZED);
          }
        });
    } catch (error) {
      return ErrorResponse(res, 400, strings.users.error.INVALID_TOKEN);
    }
  
  };

  export default {ResetToken,UseraccessRequired}