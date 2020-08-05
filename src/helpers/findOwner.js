import models from '../database/models'

const findOwner = async (businessId)  =>{
const paharmacy = await models.paharmacy.findOne({where:{id:businessId}});
const ownerData = await models.Users.findOne({ where:{id:paharmacy.owner}});

return ownerData;
}
export default findOwner;
