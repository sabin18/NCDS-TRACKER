import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import csv from 'csv-parser';
import fs from 'fs'

const { ErrorResponse, response } = responseUtil;
class MedicationsController {
static  async GetAllMedications(req,res){
    const Medications = await models.medications.findAll({})
   return response (res,200,'',Medications)
}

static async GetOneMedication(req,res){
    const  {id} = req.params;
    const medication = await models.medications.findOne({ where:{id},
    })

    if(!medication){
      return  ErrorResponse(res,404,strings.medication.error.MEDICATION_NOT_FOUND);
    }
   return response (res,200,'',medication)
}

static async AddMedication(req,res) {
   const  {name} = req.body;
   const medication = await models.medications.findOne({ where:{name},
   })

   if(medication){
     return  ErrorResponse(res,409,strings.medication.error.MEDICATION_ARLEARDY_EXIST);
   }
   const newMedication = await models.medications.create ({
      name:name,
   })
   return response (res,201,strings.medication.success.MEDICATION_CREATED,newMedication)
}

static async uploadMedication(req,res) {
   if(!req.file) {
      return ErrorResponse(res,404,"please upload file!")
    }
   const fileRows = [];
  // open uploaded file
  fs.createReadStream(req.file.path)
  .pipe(csv())
  .on('data', async(row) => {
    await fileRows.push(row);
  })
    .on("end", async () => {
       // remove temp file
      await fs.unlinkSync(req.file.path);
      //process "fileRows" and respond
      const newMedication = await models.medications.bulkCreate(fileRows);
      return response (res,201,strings.medication.success.MEDICATION_CREATED,newMedication)
        
    })  
}
static async deleteMedication(req,res){
  const  {id} = req.params;
  const disease = await models.medications.findOne({ where:{id}})
  if(!disease){
    return  ErrorResponse(res,404,strings.disease.error.DISEASE_NOT_FOUND);
  }
  const deleteMedication=await models.medications.destroy({ where:{id}})
  if(deleteMedication){
    return response (res,200,strings.medication.success.MEDICATION_DELETED)
  }
}
static async editMedication(req,res){
  const  {id} = req.params;
  const {name} =req.body;
  const disease = await models.medications.findOne({ where:{id}})
  if(!disease){
    return  ErrorResponse(res,404,strings.disease.error.DISEASE_NOT_FOUND);
  }
  const updateMedication=await models.medications.update({ name:name}, {where:{id}})
  if(updateMedication){
  
    return response (res,200,strings.medication.success.MEDICATION_UPDATED)
  }
}
}

export default MedicationsController;