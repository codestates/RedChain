
module.exports = {
    getGroup(name) {
        //DB에서 name에맞는 그룹의주소를 조회
        //return group의 지갑주소
    },

    filteringCA: (data) => {
        const result = [];
        for(let i = 0; i < data.length; i++) { 
            let info = { 
                contractaddress: data[i].contract.address,
                tokenId: data[i].tokenId,
            }
            result.push(info);
        }
        const map = new Map();
        for(const item of result) {
            map.set(JSON.stringify(item),item)
        }
        const filterData = [...map.values()];
        return filterData;
    },
    addDays: (date, days) => {
        const today = new Date();
        today.setDate(date.getDate() + days);
        
        const ymd = (today.toISOString().split("T")[0]);
        const hms = (today.toTimeString().split(" ")[0]);
        const result = (ymd + ' ' + hms);

        return (result);
    },
  
}