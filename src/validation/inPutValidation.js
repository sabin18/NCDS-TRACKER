import Joi from '@hapi/joi';
import responseUtil from '../utils/responseUtil';

const { ErrorResponse } = responseUtil;

const validation = (req, res, schema, next) => {
  const { error } = schema.validate(req.body, req.params, { abortEarly: false });
  if (error) {
    const errorMessages = [];
    error.details.forEach(detail => {
      errorMessages.push(detail.message.split('"').join(''));
    });
    return ErrorResponse(res,400,errorMessages);
  }
  return next();
};

class Inputvalidation {
static validateLogin(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.').required(),
      password: Joi.required(),  

    });
    validation(req, res, schema, next);
  }
  static validateAddUser(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().trim().min(3).max(50)
        .message('Name should be at least 3 character and not more than 50 characters!')
        .required(),
      lastName: Joi.string().trim().min(3).max(50)
        .message('Name should be at least 3 character and not more than 50 characters!')
        .required(),
      email: Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.').required(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/).message('password field should contain at least 6 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.').required(),
      phoneNumber:Joi.string().regex(/^\s*-?[0-9]{10,10}\s*$/).message('phoneNumber should be 10 numbers').required(),
      role: Joi.string().required().valid('Admin', 'owner', 'manager', 'cashier'),  
      host: Joi.string().uri().trim().message('host must be a valid URL'),   
    });

    validation(req, res, schema, next);
  }

  static validateCreateBusiness(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).message('username field should be at least 3 alphanumeric characters long.')
      .required(),
      ownerEmail: Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.').required(),
      district: Joi.string().min(3).max(30).message('district field should be at least 3 alphanumeric characters long.')
      .required(),
      sector: Joi.string().min(3).max(30).message('sector field should be at least 3 alphanumeric characters long.')
      .required(),
    });
    validation(req, res, schema, next);
  }
    static validateAddPatient(req, res, next) {
      const schema = Joi.object({
        firstName: Joi.string().min(3).max(250).message('name field should be at least 3 alphanumeric characters long.')
        .required(),
        lastName: Joi.string().min(3).max(250).message('name field should be at least 3 alphanumeric characters long.')
        .required(),
        phone:Joi.string().regex(/^\s*-?[0-9]{10,10}\s*$/).message('phoneNumber should be 10 numbers').required(),
        email:Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.'),
      });
      validation(req, res, schema, next);
   
  }

  static validateUpdPatient(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(250).message('name field should be at least 3 alphanumeric characters long.'),
      lastName: Joi.string().min(3).max(250).message('name field should be at least 3 alphanumeric characters long.'),
      phone:Joi.string().regex(/^\s*-?[0-9]{10,10}\s*$/).message('phoneNumber should be 10 numbers'),
      email:Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.'),
    });
    validation(req, res, schema, next);
 
}
  static validateAddrecord(req, res, next) {
    const schema = Joi.object({
      patient: Joi.number().integer().min(1).required(),
      quantity:Joi.number().integer().min(1).required(),
      expiryDate: Joi.string().regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).message('expiryDate format must be YYYY-MM-DD'),
      disease:Joi.string().min(3).max(50).required(),
      medication:Joi.string().min(3).max(50).required(),
    });
    validation(req, res, schema, next);
 
}
static validateAddPayment(req, res, next) {
  const schema = Joi.object({
    period: Joi.number().integer().min(1).required(),
    price:Joi.number().integer().min(1).required(),
  });
  validation(req, res, schema, next);
  
}

static validateMedication(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50)
    .required(),
     });
  validation(req, res, schema, next);
  
}
static validateResetpassword(req, res, next) {
  const schema = Joi.object({
    newPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).message('password field should contain at least 8 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.').required(),
    confirmPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).message('confirmpassword field should contain at least 8 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.').required(),
  });
  validation(req, res, schema, next);
}

static validateEmail(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.').required(),
    host: Joi.string().uri().trim().message('host must be a valid URL'),
  });
  validation(req, res, schema, next);
}

}

export default Inputvalidation