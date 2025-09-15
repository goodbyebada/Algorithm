function solution(price, money, count) {
    var answer = 0;
    let sum = 0
    
    for(let i = 1; i <= count ; i++){
        sum += i * price
    }
    
    answer = sum - money
    
    if(answer <= 0)  return 0
    

    return answer;
}