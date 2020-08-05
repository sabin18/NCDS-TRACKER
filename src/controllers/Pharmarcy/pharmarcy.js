import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import isMyBusiness from '../../helpers/checkBusiness'
import AllMyBusiness from '../../helpers/AllMyBusiness'


const { ErrorResponse, response } = responseUtil;


class PharmacyController {

static async createBusiness(req,res) {
const {name,ownerEmail,district,sector}=req.body;

const pharmacy = await models.pharmacy.findOne({where:{name}});
const user = await models.Users.findOne({ where:{email:ownerEmail}});

if (!user){
   return  ErrorResponse(res,404,strings.users.error.USER_NOT_FOUND)
}

if (pharmacy){
   return  ErrorResponse(res,409,strings.business.error.BUSINESS_EXIT)
}

const newpharmacy = await models.pharmacy.create({
    name:name,
    district:district,
    sector:sector,
    owner:user.id,
    isPaid:false,
 })
 return response (res,200,strings.business.success.BUSINESS_ADDED,newpharmacy)
}

static  async GetAllBusiness(req,res){
   const pharmacy = await models.pharmacy.findAll({
   attributes: { exclude: ['payment','owner'] },
   include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] }},{ association: 'payments', attributes: ['amount','payDate','expiryDate','period'] }],
    })
   return response (res,200,'',pharmacy)
}

static  async GetOneBusiness(req,res){
   const { businessID }= req.params;
   const pharmacy = await models.pharmacy.findOne({where:{id:businessID},
   attributes: { exclude: ['payment'] },
   include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] }},{ association: 'payments', attributes: ['amount','payDate','expiryDate','period'] }],
    })
   if(!pharmacy) {
      return  ErrorResponse(res,404,strings.business.error.BUSINESS_NOT_EXIST);  
   }
   return response (res,200,'',pharmacy)
}
static  async GetAllMyBusiness(req,res){
   await AllMyBusiness(req,res);
}

static  async GetOneMyBusiness(req,res){
   const { businessID }= req.params;
   await isMyBusiness(req,res);
   const pharmacy = await models.pharmacy.findOne({where:{id:businessID},
   attributes: { exclude: ['payment'] },
   include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] }},{ association: 'payments', attributes: ['amount','payDate','expiryDate','period'] }],
    })
   return response (res,200,'',pharmacy)
}

static async deleteBusiness(req,res){
   const { businessID }= req.params;
   const pharmacy = await models.pharmacy.findOne({where:{id:businessID},
    })
   if(!pharmacy) {
      return  ErrorResponse(res,404,strings.business.error.BUSINESS_NOT_EXIST);  
   }
   const deletePharmacy= await models.pharmacy.destroy({where:{id:businessID},});
   if(deletePharmacy){
   return response (res,200,strings.business.success.BUSINESS_ADDED,)
   }
}
static async updateBusiness(req,res){
   const { businessID }= req.params;
   const {name,district,sector}=req.body;
   const pharmacy = await models.pharmacy.findOne({where:{id:businessID},
    })
   if(!pharmacy) {
      return  ErrorResponse(res,404,strings.business.error.BUSINESS_NOT_EXIST);  
   }
   const updatePharmacy= await models.pharmacy.destroy({
      name:name,
      district:district,
      sector:sector,where:{id:businessID},});
   if(updatePharmacy){
   return response (res,200,strings.business.success.BUSINESS_ADDED,updatePharmacy)
   }
}
    
}

export default PharmacyController