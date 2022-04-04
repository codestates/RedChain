const {campaign, user} = require('../models');

module.exports = {
    get: async(req,res) => {
        const amount = await campaign.sum('amount');
        const countDonation = await user.sum('countDonation');
        const countCampaign = await campaign.count('id');

        res.status(200).json({
            amount,
            countDonation,
            countCampaign,
        })


    }
}