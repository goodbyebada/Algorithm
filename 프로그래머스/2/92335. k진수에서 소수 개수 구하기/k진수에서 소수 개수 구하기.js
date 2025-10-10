// k진수로 바꿈 -> 변환된 수 안에 아래 조건에 맞는 소수 몇 개인지 보려고 함
// 0p0
// p -> 자릿수에 0을 포함하지 않는 소수 .


// 1.
// 0을 만날때까지 += 
// 만나면 push 
// p
// 



// 2. 소수 판단.

function isPrime(num){
    
    if(num === 1) return false
    
    for(let i = 2; i <= Math.sqrt(num); i++ ){
        if((num % i ) === 0) return false
    }
    
    return true  
}

// 0 기준으로 나눈 후보 숫자들 밀어넣기
function getPlist(convertedStr){
    
    let answer = []
    let str = ""
    let i = 0

    
    while(i <= convertedStr.length){
        
        if(i === convertedStr.length && str.length > 0) answer.push(Number(str))
        
        
        if(convertedStr[i] == 0){

            if(str.length > 0 &&  str !== "1") answer.push(Number(str))
            str = ""
            i++
            continue;
        }
        
        
        str += convertedStr[i]
        i++
        
    }
    
    return answer
    
    
    
}


function solution(n, k) {
    var answer = -1;
    
//     변환
    
    const convertedStr = n.toString(k)
    const plist = getPlist(convertedStr)


    
    return plist.filter((num) => isPrime(num) ).length;
}