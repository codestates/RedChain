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
    res.json("🔥 Running server!!");
});
//현재 진행중인 캠페인의 정보를 받아온다. : Campaign
router.use('/campaign', controller.campaign.get);

//유저의 프로필정보를 받아오고, 업데이트 : Mypage
router.post('/user/:account', upload.single('profileImg') ,controller.user.update);
router.use('/user/:account', controller.user.get);
router.use('/create/:account', controller.user.post);
router.use('/update/:account', controller.user.update);

router.use('/support/nft/:account', controller.support.get);
router.use('/support/nft/', controller.support.post);


//옥션 중인 아이템 클릭시 세부페이지로 이동하면 표시해야할 정보
router.use('/auction/detail/:id', controller.orderbook.get);
router.use('/orderbook/:id', controller.orderbook.post);

//진행중인 옥션을 모두 표기
router.get('/auction', controller.auction.get);

router.use('/nft/seal/:id', controller.seal.get);
router.use('/buy/seal', controller.seal.post);


//KIP17 metadata.json으로부터 image정보 파싱할 때 사용
router.post('/metadata', async (req,res) => {
        const {metadata_url} = req.body;
        await axios.get(metadata_url)
        .then((src)=> {
            res.status(200).json(src.data.image);
        })
        .catch(err=> console.log(err));
})

module.exports = router;