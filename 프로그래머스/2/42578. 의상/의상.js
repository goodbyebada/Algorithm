function solution(clothes) {
    var answer = 0;
    let map = new Map()
    
    for(let [item, key] of clothes ){
        if(map.has(key)){
            const prev = map.get(key)
            map.set(key, prev+1)
        }else{
            map.set(key, 1)
        }        
    }
    
    
    let mul = 1
    let sum =0 
    
  
    for(let [item, count] of map){
        mul *= (count+1)
    }
    
    
    
    answer = mul -1
    
    return answer;
}