import models from '../database/models'
import responseUtil from '../Utils/responseUtil'
import strings from '../Utils/strings'
import moment from 'moment';


const saveMedicalRecord = async (res,{patient,quantity,disease,medication,quantityType,expiryDate},businessID,id) =>{

const { ErrorResponse, response } = responseUtil;

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
     quantityType:quantityType,
     expiryDate:expiryDate
 },
 
 ];
 const newRecord = await models.records.bulkCreate(recordData);
 await models.patient.update({record: envoice},{where:{id:patient}});
 return response (res,201,strings.record.success.RECORD_CREATED,newRecord);

}

export default saveMedicalRecord