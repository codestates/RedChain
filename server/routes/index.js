const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const axios = require('axios');

router.get('/', (req,res) => {
    res.json("🔥 Running server!!");
});
//현재 진행중인 캠페인의 정보를 받아온다. : Campaign
router.use('/campaign', controller.campaign.get);

//유저의 프로필정보를 받아오고, 업데이트 : Mypage
router.use('/user/:account', controller.user.get);
router.use('/user/:account', controller.user.post);

//총 기부 금액, 총 기부횟수, 캠페인 수를 요청 및 응답 : main
router.use('/orderbook/', controller.orderbook.get);

//누가 누구에게 얼마를 기부했는지 추가(업데이트) : Support Coin
router.use('/orderbook/', controller.orderbook.post);


router.use('/support/nft/:account', controller.support.get);
// router.use('/info/:tokenURI', controller.support.info.get);
//진행중인 옥션을 모두 표기
router.use('/auction', controller.auction.get);

//옥션 중인 아이템 클릭시 세부페이지로 이동하면 표시해야할 정보
router.use('/auction/:id/', controller.auctionDetails.get);

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