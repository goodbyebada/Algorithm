function solution(x, y, n) {
    var answer = Infinity;
    
    const q = [[0, x]]
    let index = 0
    const multis = [2,3]
    const set = new Set()
    
    while(q.length > index){
        const [ count, val ] = q[index++]
        
        if(val === y &&  answer > count) answer = count
        
        for(let multi of multis){
            let curr = val * multi
                if( curr <= y && !set.has(curr)){ 
                    q.push([count+1, curr])
                    set.add(curr)
                }
            
        }
        
//         더하기 일대 
        let curr = val + n
        if( curr <= y && !set.has(curr)){ 
            q.push([count+1, curr])
            set.add(curr)
        }
     
    }
    
    if(answer === Infinity) return -1
    return answer
    

}