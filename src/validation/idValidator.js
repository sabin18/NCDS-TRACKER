import Joi from '@hapi/joi';

const idValidator = data => {
  const schema = Joi.object().keys({
    businessID: Joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).message('You are using invalid id'),
  });
  return schema.validate(data);
};

export default idValidator;