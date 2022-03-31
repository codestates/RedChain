const {sequelize} = require('../models');


module.exports = {
    get: async(req,res) => {
        const [results, metadata] = await sequelize.query(
            `SELECT auctionlists.id,
                    auctionlists.contributor,
                    auctionlists.tokenAddress, 
                    auctionlists.tokenId, 
                    auctionlists.tokenURI,
                    auctionlists.auctionAddress,
                    auctionlists.startAt,
                    auctionlists.endAt,
                    MAX(bid) as highestBid
            FROM auctionlists 
            LEFT JOIN orderbooks 
            ON auctionlists.id = orderbooks.auctionId 
            WHERE auctionlists.status = true GROUP BY id;`
        )
        console.log(results);
        res.status(200).json(results);

    },
}

/*SELECT auctionlists.id,
         auctionlists.contributor,
         auctionlists.tokenAddress, 
         auctionlists.tokenId, 
         auctionlists.tokenURI, 
         MAX(bid) as highestBid
FROM auctionlists 
LEFT JOIN orderbooks 
ON auctionlists.id = orderbooks.auctionId 
WHERE auctionlists.status = true GROUP BY id;
*/