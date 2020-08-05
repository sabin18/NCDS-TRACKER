import idValidator from '../validation/idValidator';
import responseUtil from '../Utils/responseUtil'

const { ErrorResponse } = responseUtil;
const checkId = (req, res, next) => {
  const {businessID} = req.params;
  const { error } = idValidator({ businessID })
  if (error) {
    return ErrorResponse(res, 400, error.details[0].message );
  }
  return next();
};

export default checkId;
