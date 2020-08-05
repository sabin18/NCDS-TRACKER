import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import isMyBusiness from '../../helpers/checkBusiness'
import { Op } from 'sequelize';


const { ErrorResponse, response } = responseUtil;
class PatientController {

static async addPatient(req,res) {
const {firstName,lastName,phone,email}=req.body;
const  { id } = req.user.payload;

await isMyBusiness(req,res);

const checkPatient = await models.patient.findOne({ where:{ [Op.and]: [{firstName},{lastName}, {phone}]}});

if (checkPatient){
   return  ErrorResponse(res,409,strings.patient.error.PATIENT_EXIT)
}
const newPatient = await models.patient.create({
    firstName:firstName,
    lastName:lastName,
    phone:phone,
    email:email,
    user:id

 })
 return response (res,200,strings.patient.success.PATIENT_CREATED,newPatient);
}
static async getAllPatient(req,res) {
   
   await isMyBusiness(req,res);
   
   const Patient = await models.patient.findAll({
   attributes: { exclude: ['user','record','createdAt', 'updatedAt'] },
   include: [{ association: 'users',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },{ association: 'records',attributes: {exclude: ['user', 'pharmacyId','patientId','disease','medication','createdAt', 'updatedAt']},
   include: [{ association: 'users',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },
   { association: 'pharmacy', attributes: ['name'] },{ association: 'patient', attributes: { exclude: ['createdAt','updatedAt']}},
   { association: 'diseases', attributes: ['name'] },{ association: 'medications', attributes: ['name'] }],}],
});
    return response (res,200,'',Patient);   
}

static async getOnePatient(req,res) {
const  { id } = req.params;

await isMyBusiness(req,res);

const Patient = await models.patient.findOne({ where:{id},
   attributes: { exclude: ['user','record','createdAt', 'updatedAt'] },
   include: [{ association: 'users',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },{ association: 'records',attributes: {exclude: ['user', 'pharmacyId','patientId','disease','medication','createdAt', 'updatedAt']},
   include: [{ association: 'users',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },
   { association: 'pharmacy', attributes: ['name'] },{ association: 'patient', attributes: { exclude: ['createdAt','updatedAt']}},
   { association: 'diseases', attributes: ['name'] },{ association: 'medications', attributes: ['name'] }],}],
});

if (!Patient){
   return  ErrorResponse(res,404,strings.patient.error.PATIENT_NOT_FOUND)
}

 return response (res,200,'',Patient);   
}
static async DeletePatient(req,res) {
   const  { id } = req.params;
   
   await isMyBusiness(req,res);
   
   const Patient = await models.patient.findOne({ where:{id},});
   
   if (!Patient){
      return  ErrorResponse(res,404,strings.patient.error.PATIENT_NOT_FOUND)
   }

   const deletePatient=await models.patient.destroy({ where:{id},});
   if(deletePatient){
    return response (res,200,strings.patient.success.PATIENT_DELETED);   
   }
   }

static async updatePatient(req,res) {
   const  { id } = req.params;
   const {firstName,lastName,phone,email}=req.body; 

   await isMyBusiness(req,res); 
   const Patient = await models.patient.findOne({ where:{id},});
      
   if (!Patient){
      return  ErrorResponse(res,404,strings.patient.error.PATIENT_NOT_FOUND)
      }
   
      const updatePatient=await models.patient.update({firstName:firstName,
      lastName:lastName,phone:phone,email:email}, {where:{id}});
      if(updatePatient){
      return response (res,200,strings.patient.success.PATIENT_UPDATED);   
   }
}
   
}

export default PatientController