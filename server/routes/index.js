const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/', (req,res) => {
    res.json("🔥 Running server!!");
});
//현재 진행중인 캠페인의 정보를 받아온다. : Campaign
router.use('/campaign', controller.campaign.get);

//유저의 프로필정보를 받아오고, 업데이트 : Mypage
router.use('/user/:account', controller.user.get);
router.use('/user/:account', controller.user.post);

//총 기부 금액, 총 기부횟수, 캠페인 수를 요청 및 응답 : main
router.use('./orderbook/', controller.orderbook.get);

//누가 누구에게 얼마를 기부했는지 추가(업데이트) : Support Coin
router.use('./orderbook/', controller.orderbook.post);

//진행중인 옥션을 모두 표기
router.use('./auction', controller.auction.get);

//옥션 중인 아이템 클릭시 세부페이지로 이동하면 표시해야할 정보
router.use('./auction/:id/', controller.auctionDetails.get);

module.exports = router;