function solution(numbers) {

    const strNumbers = numbers.map(n => n.toString());
    
    // 커스텀 정렬: a+b vs b+a 비교
    strNumbers.sort((a, b) => {
        const order1 = a + b;  
        // "3" + "30" = "330"
        
        const order2 = b + a;  
        
        // "30" + "3" = "303"
        return order2 - order1;  // 내림차순 (큰 것이 앞으로)
    });
    
    const answer = strNumbers.join('');
    
    // 모든 숫자가 0인 경우
    return answer[0] === '0' ? '0' : answer;
}