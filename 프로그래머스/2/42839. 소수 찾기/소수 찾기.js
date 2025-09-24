
// 소수찾기


// 주어진 숫자들로 소수가 되는 조합 모두 찾기
// 주의 : 11 011은 같음 -> 맨 앞자리가 0인 것은 거르기


// dfs로 만들 수 있는 모든 소수를 만든다.
// 맨 앞자리가 0이면  pass
// 소수 임을 확인한다.
// numbers <= 7

function solution(numbers) {
    var answer = [];
    
    let N = numbers.length
    
    
    for(let i = 0; i < N; i++){
//         매 케이스마다 visited 처리 안해줌
        const visited = Array(N).fill(false)
        visited[i] = true
        const str = `${numbers[i]}`
        
//         매번 들어가야함. 
        answer.push(str)
        
        dfs(str, N, visited, numbers, answer)
    }
    
    
    
    const list = answer.map((elm) => +elm).filter((elem) => isPrime(elem)== true)
    

    const set = new Set(list)
    
    
    return set.size;
}

//  길이가 numbers.length랑 같다면 탈출

function dfs(str, N, visited, numbers, answer){
    
    if(str.length === N){
        return 
    }
    
    for(let i = 0; i < N; i++){
        if(visited[i]) continue
        let newStr = str + numbers[i]
        const newVisted = [...visited]
        newVisted[i] = true
        answer.push(newStr)
        dfs(newStr, N, newVisted , numbers, answer)
    }
    
}


function isPrime(number){
    
//     0 예외 처리 안해줌
    if(number === 1|| number === 0)  return false
    

    for(let i = 2; i <= Math.sqrt(number) ; i++){
        if(number % i === 0) return false
    }
    
    return true
    
}




