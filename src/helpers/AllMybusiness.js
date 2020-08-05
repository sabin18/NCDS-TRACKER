import models from '../database/models'
import responseUtil from '../Utils/responseUtil'
import strings from '../Utils/strings'

const { ErrorResponse,response } = responseUtil;

const AllMyPharmacy = async (req,res)  =>{
const { id } = req.user.payload;
const pharmacy = await models.pharmacy.findAll({where:{owner:id}});
const employee = await models.employees.findOne({ where:{userId:id}});

const allEmployeePharmacy =!employee ? employee: await models.pharmacy.findAll({where:{id:employee.pharmacyId},
    attributes: { exclude: ['payment'] },
    include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] }},{ association: 'payments', attributes: ['amount','payDate','expiryDate','period'] }],
     })

 if(pharmacy.lenght===0 && allEmployeePharmacy.lenght===0){
   return  ErrorResponse(res,404,strings.pharmacy.error.pharmacy_NOT_EXIST);
 }

if(!pharmacy.lenght===0){
 return response(res,200,'',pharmacy);
}
else{
return response(res,200,allEmployeepharmacy);  
}
}

export default AllMyPharmacy;

