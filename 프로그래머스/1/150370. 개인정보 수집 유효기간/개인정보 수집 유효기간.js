function solution(today, terms, privacies) {
    var answer = [];
    const map = {}
    
    terms.map((elem) => {
        const [type, num] = elem.split(" ")
        map[type] = Number(num)
    })
    
    const todayStr = today.split(".").join("")
    
    for(let i = 0; i < privacies.length; i++){
        const [info, type] = privacies[i].split(" ")
        let [year, month, date] = info.split(".").map(Number)
        
        // 유효기간 더하기
        month += map[type]
        
        // 월 계산 (12개월 넘으면 연도로 변환)
        if(month > 12) {
            year += Math.floor((month - 1) / 12)
            month = ((month - 1) % 12) + 1
        }
        
        const expireDate = returnStr(year) + returnStr(month) + returnStr(date)
        
        // 오늘이 만료일보다 크거나 같으면 파기
        if(todayStr >= expireDate) {
            answer.push(i+1)
        }
    }
    
    function returnStr(num){
        if(num < 10) return `0${num}`
        return `${num}` 
    }
    
    return answer;
}