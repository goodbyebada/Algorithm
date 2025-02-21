

function solution(citations) {
    var answer = 0;

    // 1️⃣ 내림차순 정렬 (인용 횟수가 많은 순서대로)
    citations.sort((a, b) => b - a);

    // 2️⃣ H-Index 찾기
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] > i) answer++;
        else break;
    }

    return answer;
}

// function solution(citations) {
//     var answer = 0;
    
//     const list = citations.sort((a,b) => a-b);
//     console.log(list)
//     answer = sol(list)  
//     return answer;
// }

function sol(list){
    const n = list.length
    let end = list.length
    let start = 0
    let mid = Math.floor((start+end)/2);
    let h = 0
    
    while(1){
            
        if(n-mid < list[mid]) {
            mid--;
            break;
        }
        else mid++
                 
    }
    
    return list[mid]
    
    
    
    
    
    
}



function bs(list){
    const n = list.length
    let end = list.length
    let start = 0
    
//     오른쪽 이동
    while(start < end){
        let mid = Math.floor((start+ end)/2)
        let h = list[mid]
        const usedBookCnt = n - mid
        
//         usedBookCnt >= h => 조건
        if(usedBookCnt >= h){
            start = mid+1
//             오른쪽으로 이동
        }else{
            end = mid
        }
        
         
    }
    return list[end -1]
   
}