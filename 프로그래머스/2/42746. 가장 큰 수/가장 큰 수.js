



// a와 b를 str로 만들어비교한다.
// 길이가 긴 str의 idx로 접근한다.
// 만약 짧은 str undefined가 나왔을시, 긴 str[idx-1] < str[idx] 일때 긴 str이 max 된다.
// 아니라면 a 가 max
// a와 b중 뭐가 긴지 알아야한다.

//  max = a ? 혹은 b인지 알아야함
//  max 가 a 라면 -1
//  b 라면 1 출력
// 같다면 1 출력

// 자리를 바꿔야한다면 return 1
// 아니라면 -1


// 내림차순
// ? 왜안되지?
function failCompare(a,b){
    
    const aString = `${a}`
    const bString = `${b}`
    const maxlenStr = aString.length < bString.length ? bString : aString;
    const minLenStr = maxlenStr === aString ? bString: aString;
    let result = ''
 
    for(let idx = 0; idx < maxlenStr.length; idx++){
        
        const min = Number(minLenStr[idx]);
        const max = Number(maxlenStr[idx]);
        
        if(min === max) continue;
        if(Number.isNaN(min)){
            
            if(Number(maxlenStr[idx-1]) < max) result = maxlenStr
            else result = minLenStr;
            break
        }
        
        
        if(min < max ) result =  maxlenStr;
        else result = minLenStr;
        
        break;
    }
    
    
//     result가 Max인 값
    (a, b)
    
    if(result === aString) return 1;
    else return -1
    

}


function compare(a, b) {
    const strA = a.toString();
    const strB = b.toString();
    return (strB + strA) - (strA + strB);
}

// 정수를 이어붙여 만들 수 있는 가장 큰 수
// 모든 배열의 원소를 다 사용해야한다.
function solution(numbers) {
    var answer = '';
    
    numbers.sort((a,b) => compare(a,b)).forEach((elem) => answer+= elem)
    console.log(numbers)

    
//     0인경우 0으로 출력해야한다.
    return answer[0] === '0' ? '0' : answer;
}