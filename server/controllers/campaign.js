const {sequelize} = require('../models');

module.exports = {
    get: async(req,res) => {
       try{
         const [result, metadata] =  await sequelize.query(`
                                     SELECT * FROM campaigns`)
         res.status(200).json(result);
        } catch(err) {
            throw(err)
        }
       


    },
    filter: async(req,res) => {
        try{
            const {id} = req.params;
            const [result, metadata] =  await sequelize.query(`
                                        SELECT * FROM campaigns
                                        WHERE id = ${id}`);
            res.status(200).json(result);
           } catch(err) {
               throw(err)
           }
          
    }
    
}