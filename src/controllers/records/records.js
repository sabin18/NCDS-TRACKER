import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import isMyBusiness from '../../helpers/checkBusiness'
import sendNotification from '../../helpers/sendNotification'
import { Op } from 'sequelize';
import ip from 'ip';
import moment from 'moment';


const { ErrorResponse, response } = responseUtil;
// const MyIp=ip.address();

class RecordController {

static async addMedicalRecord(req,res,next) {
const {patient,quantity,expiryDate,disease,medication}=req.body;
const {businessID}=req.params;
const {id}=req.user.payload;

await isMyBusiness(req,res);

const checkRecord = await models.records.findAll({});
const checkPatient = await models.patient.findOne({where:{id:patient}});
const deseaseName = await models.diseases.findOne({where:{name:disease}});
const medicationName = await models.medications.findOne({where:{name:medication}});
const no = parseInt(checkRecord.length) + 1;
const envoice=(`${moment().format('YYYY')}/${moment().format('MM')}/ABC00${no}`)

if (!checkPatient){
   return  ErrorResponse(res,404,strings.patient.error.PATIENT_NOT_FOUND)
}
if (!deseaseName){
    return  ErrorResponse(res,404,strings.disease.error.DISEASE_NOT_FOUND)
 }
 
if (!medicationName){
    return  ErrorResponse(res,404,strings.medication.error.MEDICATION_NOT_FOUND)
 }
const recordData=[{
    patientId:patient,
    quantity:quantity,
    invoiceNumber:envoice,
    disease:deseaseName.id,
    medication:medicationName.id,
    date:moment().format('YYYY-MM-DD HH:mm:ss'),
    user:id,
    pharmacyId:businessID,
    expiryDate:expiryDate
},

];
const newRecord = await models.records.bulkCreate(recordData);
await models.patient.update({record: envoice},{where:{id:patient}});
return response (res,201,strings.record.success.RECORD_CREATED,newRecord);
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