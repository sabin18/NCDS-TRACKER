import models from '../database/models'
import responseUtil from '../Utils/responseUtil'
import strings from '../Utils/strings'

const { ErrorResponse,response } = responseUtil;

const AllMyPharmacy = async (req,res)  =>{
const { id } = req.user.payload;

const pharmacy = await models.pharmacy.findAll({where:{owner:id}});
console.log('===>1',pharmacy.length)
const employee = await models.employees.findOne({ where:{userId:id}});

const allEmployeePharmacy =!employee ? employee: await models.pharmacy.findAll({where:{id:employee.pharmacyId},
    attributes: { exclude: ['payment'] },
    include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] }},{ association: 'payments', attributes: ['amount','payDate','expiryDate','period'] }],
     })
     console.log('===>2',allEmployeePharmacy)
 if(pharmacy.length===0 && allEmployeePharmacy.length===0){
   return  ErrorResponse(res,404,strings.pharmacy.error.pharmacy_NOT_EXIST);
 }

if(pharmacy.length!=0){

 return response(res,200,'',pharmacy);
}
else{
  
return response(res,200,allEmployeePharmacy);  
}
}

export default AllMyPharmacy;

