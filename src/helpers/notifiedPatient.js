import models from '../database/models'
import moment from 'moment'


const phoneNumbers=async ()=>{
  const Now=moment().format('YYYY-MM-DD');
  const expiryDate=moment(Now).subtract(3,'days').format('YYYY-MM-DD');
  const findAll3Days=await models.records.findAll({ where:{expiryDate}});
  const findAllToDays=await models.records.findAll({ where:{expiryDate:Now}});
  const patientId3day = await findAll3Days.map(function(item){return item.patientId;});
  const patientIdNow = await findAllToDays.map(function(item){return item.patientId;});
  const arrayId=patientId3day.concat(patientIdNow)
  const uniqueId= new Set(arrayId)
  const patientId=[...uniqueId]
  const getPatientPhone = await models.patient.findAll({where:{id:patientId}})
  const phoneNumbers= await getPatientPhone.map(function(item){return item.phone;});
  
  return phoneNumbers
  
}
export default phoneNumbers;