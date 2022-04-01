const {orderbook, sequelize} = require('../models');
const {addDays} = require('../functions/index');
const date = new Date();

module.exports = {
    get: async(req,res) => {
        const [results, metadata] = await sequelize.query(
                `SELECT id, bidder,bid, createdAt 
                FROM orderbooks 
                WHERE auctionId=${req.params.id}`
            )
            console.log(results);
        res.status(200).json(results);


    },
    post : async(req,res) => {
        console.log("들어옴!");
        await orderbook.create({
            auctionId: req.params.id,
            bidder: req.body.bidder,
            bid: req.body.bid,
            createdAt: addDays(date,0),
        }).then(()=> res.status(200).json("ok"))
        .catch(err => console.log(err));
    },
}