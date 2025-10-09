// n명 사용자들에게 m개를 할인해 판매


// 사용자들 구매 규칙
// 2. 임티 구매 비용의 합 >= 일정 가격 ~ 플러스 가입
// 1. 일정 비율 이상 할인 임티모두 구매



// 1  40 만원 => 2번만
// 2 25 만원 => 각


// users의 원소는 [비율, 가격]
// emoticons -> 이모티콘 정가.
// 결과 : [서비스 가입 수, 판매액]


// 모든 후보를 구했을때 정렬은 가입자 , 판매액 내림차순
// 1. 가입자를 최대한 늘린다.
// 2. 이모티콘 판매액을 늘린다.


// 최적,,이 엄따,, 그리디..?
// N명
// 1명 -> 
// 플러스 가입 우선 => 일정 합 이상이라면 임티 구매 X, 플러스 가입
// 플러스 가입 X라면 일정 비율 이상으로 이모티콘을 구매해야함
// 최대한 많이 ~ 
// 할인율 정해졍져있음  10%, 20%, 30%, 40% 중 하나.
// emoticons * 2^6 조합

// 완탐해도 괜찮을 것 같은데
// 1. 합 이상인 걸 찾는게 우선이다.
// 합 기준으로 오름차순으로 정렬. => 모두 임티가입
//  emoticons * 2^6 에서 찾는다 7*6*log2  그 값 이하인 수를 찾는다.
// 1 2 3 4 5 
// 후보들이 0보다 크다면 후보들 중 한다.

// 후보들 <=0 이라면
// 최소 할인률이  10%, 20%, 30%, 40% 범위중 어디인지 판단한다.
// 
// 2. 할인률 기준으로 오름차순. 작은 것부터 한당
// 2로 넘어가는디 , 3 1의 할인률 이상임을 생각해야함.

// a. 전처리 먼저한다.
// b. 총 가입합을 구한당
// 




// 🤓 문제 잘못 읽음 
// 1. 일정 비율 이상 할인하면 구매.
// 2. 구매시, 구매 비용의 합이 일정 가격 이상 -> 취소하고 이모티콘 플러스 서비스 가입
// 오름차순으로 정렬 -> 해당 할인률로 이모티콘 할인
// 그 뒤에 있는 애들은 모두 구매
// 이모티콘 할인한 합 계산 
// 40% -> 40% 40% 40% 40%
// 40% 30% -> 40% 30% 30% 30%
// 앞에 있는 애 하나라도 더 사기는 함 ~> 구매비용 올라감~
// 




function solution(users, emoticons) {
    var answer = [];
    
//     % 범위 내부의 %로 만들기
    const rawUsers = users.map(([percent, price]) =>  [Math.floor(percent * 0.1) * 10, price])
    
    
//     0번 인데긋 percent
//     1 - price
//         1. 할인률 내림차순
//         2. 할인합 내림차순
    const sortedUsers = rawUsers.sort((a, b) => {
        if(a[0]-b[0] === 0) return b[1] - a[1]
        return b[0] - a[0]
    })

    const LEN = emoticons.length
    
//     모든 퍼센트 리스트 후보를 구한다. 4^7
//     하나씩 계산한다.. 
//     정렬.. 웨..
    
    
//  [][]   
    const percentLists = percentAllList( [10, 20, 30, 40], LEN)
    
    for(let pl of percentLists){
        const map = {sign : 0, sum : 0}
        
//         1. 각 pl 자기 할인률 > 할인률 -> 안 사 ~ continue
//         2. else: 계산 += 
//         3. 마지막 sum >= 본인의 sum 비교
        for(let user of users){
            const [userP, userS] = user
            let sum = 0 
            
//        percent에 대한 값     
            for(let i = 0; i < LEN; i++){
                if(pl[i] < userP) continue
                else sum += getPemoticon( pl[i] , emoticons[i])    
            }
            
            
//             판단 로직 -> 플러스 가입유무
            if(sum >= userS) map.sign += 1
            else map.sum += sum          
    }
        
    answer.push(map)
             
    }
    

    
    answer.sort((a, b) => {
        if(a.sign - b.sign === 0) return b.sum - a.sum
        return  b.sign - a.sign
    })
    

    return [answer[0].sign, answer[0].sum];
}


// 할인한 이모티콘 가격 구하기.
function getPemoticon( p , emtVal){
    return emtVal - (emtVal * p/ 100)
}



// 순열 만들기
// 2^emoticons.length
// [40, 30] N개의 길이
function percentAllList(pl, N){
    const answer = []
    
    function dfs(arr, depth){
        
        if(depth === N) {
            answer.push(arr)
             return        
            
        }
        for(let i = 0; i < pl.length; i++){
            const curr = pl[i]
            const newArr = [...arr]
            dfs([...arr, curr], depth + 1)
            
        }  
    }
    
    dfs([], 0)
    
    
    return answer
}



