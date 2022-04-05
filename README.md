# RedChain

최근 우크라이나 vs 러시아 전쟁을 시작으로 암호화폐로 기부를하는 움직임이 활발이 일어나고 있습니다. 우크라이나 사태 뿐만아니라, 아프리카, 아프간난민, 아이티 지진, 국내 소외계층 등 지속적으로 캠페인에 대한 수요가 많이 있습니다. 암호화폐 기부시장에 대한 관심이 이러한 수요들에 맞추어 지속적으로 상승할 예정입니다. 그러나 현재 개인적인 지갑주소나, 특정 모금 캠페인을 하는 사람의 주소가 아니라면, 지갑 주소를 알아내기도 힘들 뿐더러, 이런것을 빌미로 사기치는 사람들이 속속 나오고 있습니다.
redchain은 블록체인을 통한 투명하고 공정한 모금활동을 목표로합니다.

- 기능 소개
    SUPPORT NFT 페이지
    
           - 현재 지갑주소의 보유한 KIP17 출력
    
           - 본인이 소유한 KIP17 메인 계정으로 전송기능
    
    SUPPORT COIN 페이지
    
           - 현재 지갑주소의 보유한 KLAY 출력
    
           - 본인이 소유한 KLAY 캠페인 컨트랙트로 전송기능
    
    auction 페이지
    
           - 상위 가격 입찰시, 기존 입찰자에게는 klay 환불
    
           - auction 취소시 입찰된 가격 환불
    
           - auction 입찰 기록 출력

    crypto-seal 페이지
           - 랜덤 KIP37 판매
***************************
caver-js 리액트에서 import에러 해결법
1. 추가 모듈 설치
npm install crypto-browserify https-browserify os-browserify stream-browserify stream-http url assert
2. node_moduels/react-scripts/config/webpack.config.js파일 수정
    ![image](https://user-images.githubusercontent.com/90881940/161673647-5a6cb854-2ca4-4a6c-995b-6b3f3d8e5d80.png)

resolve:{
	fallback:{
        fs: false,
        net: false,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
      },
	moduel: ...
}
