import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import isMyBusiness from '../../helpers/checkBusiness'
import saveMedicalRecord from  '../../helpers/createMedicalRecord';

const { ErrorResponse, response } = responseUtil;

class RecordController {

static async addMedicalRecord(req,res,next) {
const { medicalRecords }=req.body;
const {businessID}=req.params;
const {id}=req.user.payload;

await isMyBusiness(req,res);

await Promise.all(medicalRecords.map(async MedicalRecord => {
    await saveMedicalRecord(res, MedicalRecord, businessID,id);
  }));

}

static async viewMedicalRecords(req,res) {
    await isMyBusiness(req,res);
    const records=await models.records.findAll({
        attributes: {exclude: ['user', 'pharmacyId','patientId','disease','medication']},
        include: [{ association: 'users',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },
        { association: 'pharmacy', attributes: ['name'] },{ association: 'patient', attributes: { exclude: ['createdAt','updatedAt']}},
        { association: 'diseases', attributes: ['name'] },{ association: 'medications', attributes: ['name'] }],
        });
    return response (res,200,'',records);
    }


static async viewSingleMedicalRecords(req,res) {
   const  {id} = req.params;
   await isMyBusiness(req,res);
   const records=await models.records.findOne({
        where:{id},
        attributes: {exclude: ['user', 'pharmacyId','patientId','disease','medication']},
        include: [{ association: 'users',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },
        { association: 'pharmacy', attributes: ['name'] },{ association: 'patient', attributes: { exclude: ['createdAt','updatedAt']}},
        { association: 'diseases', attributes: ['name'] },{ association: 'medications', attributes: ['name'] }],
    });
    if(!records){
    return  ErrorResponse(res,404,strings.records.error.records_NOT_FOUND)   
    }
    return response (res,200,'',records);
    }
    
}

export default RecordController