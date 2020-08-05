import models from '../../database/models';
import responseUtil from '../../Utils/responseUtil';
import strings from '../../Utils/strings';
import csv from 'csv-parser';
import fs from 'fs'


const { ErrorResponse, response } = responseUtil;
class DiseasesController {
static  async GetAllDiseases(req,res){
    const diseases = await models.diseases.findAll({})
   return response (res,200,'',diseases)
}

static async GetOneDisease(req,res){
    const  {id} = req.params;
    const disease = await models.diseases.findOne({ where:{id}})
    if(!disease){
      return  ErrorResponse(res,404,strings.disease.error.DISEASE_NOT_FOUND);
    }
   return response (res,200,'',disease)
}

static async AddDiseases(req,res) {
  const  {name} = req.body;
  const disease = await models.diseases.findOne({ where:{name}})
    if(disease){
      return  ErrorResponse(res,409,strings.disease.error.DISEASE_ARLEARDY_EXIST);
    }
   const newdisease = await models.diseases.create ({
      name:name,
   })
   return response (res,201,strings.disease.success.DISEASE_CREATED,newdisease)
}

static async uploadDiseases(req,res) {
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
     const newdisease = await models.diseases.bulkCreate(fileRows);
     return response (res,201,strings.disease.success.DISEASE_CREATED,newdisease)
       
   })  
}

static async deleteOneDisease(req,res){
  const  {id} = req.params;
  const disease = await models.diseases.findOne({ where:{id}})
  if(!disease){
    return  ErrorResponse(res,404,strings.disease.error.DISEASE_NOT_FOUND);
  }
  const deleteDidisease=await models.diseases.destroy({ where:{id}})
  if(deleteDidisease){
 return response (res,200,strings.disease.success.DISEASE_DELETED)
  }
}
static async editDisease(req,res){
  const  {id} = req.params;
  const {name} =req.body;
  const disease = await models.diseases.findOne({ where:{id}})
  if(!disease){
    return  ErrorResponse(res,404,strings.disease.error.DISEASE_NOT_FOUND);
  }
 const updateDidisease=await models.diseases.update({name:name} ,{ where:{id}})
  if(updateDidisease){
  
 return response (res,200,strings.disease.success.DISEASE_UPDATED)
  }
}
}

export default DiseasesController;