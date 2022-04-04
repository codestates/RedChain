const {sealhistories, sequelize} = require('../models');

module.exports = {
    get: async(req,res) => {
        await sequelize.query(`
        SELECT * FROM sealhistories`)
        .then((data) => res.status(200).json(data))
        .catch(err => console.log(err));
    }

}