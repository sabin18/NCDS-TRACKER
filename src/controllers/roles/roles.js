import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'


const { ErrorResponse, response } = responseUtil;
class RolesController {
static  async GetRoles(req,res){
   const roles = await models.roles.findAll({ 
    })
   return response (res,200,'',roles)
}
}

export default RolesController;