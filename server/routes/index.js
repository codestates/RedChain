const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const axios = require('axios');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'userImg/')
      },
    filename: function (req, file, cb) {
        const {account} = req.params;
        cb(null, account + file.fieldname + '.jpeg');
      }
})
const upload = multer({ storage: storage})



router.get('/', (req,res) => {
    res.json("๐ฅ Running server!!");
});
//ํ์ฌ ์งํ์ค์ธ ์บ ํ์ธ์ ์ ๋ณด๋ฅผ ๋ฐ์์จ๋ค. : Campaign
router.use('/campaign/detail/:id', controller.campaign.filter);
router.use('/campaign', controller.campaign.get);

//Home ํ๋ฉด
router.use('/home', controller.home.get);

//์ ์ ์ ํ๋กํ์ ๋ณด๋ฅผ ๋ฐ์์ค๊ณ , ์๋ฐ์ดํธ : Mypage
// router.post('/user/:account', upload.single('profileImg') ,controller.user.update);
router.use('/user/:account', controller.user.get);
router.use('/create/:account', upload.single('profileImg'),controller.user.post);
router.use('/update/:account', upload.single('profileImg'),controller.user.update);

router.use('/support/nft/:account', controller.support.get);
router.use('/support/nft', controller.support.post);


//์ฅ์ ์ค์ธ ์์ดํ ํด๋ฆญ์ ์ธ๋ถํ์ด์ง๋ก ์ด๋ํ๋ฉด ํ์ํด์ผํ  ์ ๋ณด
router.use('/auction/detail/:id', controller.orderbook.get);
router.use('/orderbook/:id', controller.orderbook.post);

//์งํ์ค์ธ ์ฅ์์ ๋ชจ๋ ํ๊ธฐ
router.get('/auction', controller.auction.get);

router.use('/seal/amount', controller.seal.get);
router.use('/seal/history', controller.sealHistory.get);
router.use('/buy/seal', controller.seal.post);


//KIP17 metadata.json์ผ๋ก๋ถํฐ image์ ๋ณด ํ์ฑํ  ๋ ์ฌ์ฉ
router.post('/metadata', async (req,res) => {
        const {metadata_url} = req.body;
        await axios.get(metadata_url)
        .then((src)=> {
            res.status(200).json(src.data.image);
        })
        .catch(err=> console.log(err));
})

module.exports = router;