const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/', (req,res) => {
    res.json("🔥 Running server!!");
});

router.use('/campaign', controller.campaign.get);


module.exports = router;