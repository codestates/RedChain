const {user,sequelize} = require('../models')
require('dotenv').config();


module.exports = {
    get: async(req,res) => {
        if(!req.params) {
            res.status(400).json("Wrong connection!");
        }
        else {
            const {account} = req.params;
            await user.findOne({
                where: {account,}
            }).then((data) => {
                if(data) {
                    return res.status(200).json(data);
                } 

                return res.status(404).json("Not Found");    
            })
          
        }
       
    },
    post : async(req,res) => {
        const {name, about} = req.body;
        const {account} = req.params;
        const  profileImg = req.file.path;
        await user.create({
            name,
            account,
            about,
            profileImg,
        }).then((data) => {
            if(data) {
                return res.status(200).json("ok");
            }
            return res.status(400).join("Not found!!");
        }).catch(err => console.log(err));
        // res.status(200).json("ok");
        },
    update: async(req,res) => {
        console.log(req.body);
        const {name, about} = req.body;
        const {account} = req.params;
        const  profileImg = req.file.path;
        await user.update({
             name,
             about,
             profileimg,
            },
            {where:{account,}
            }
        ).then(() => res.status(200).json("ok!"))
        .catch(err => console.log(err));
    },
}
 