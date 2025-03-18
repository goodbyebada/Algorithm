function solution(s){

    
    const queue = []
    const list = s.split("")
    let idx = 0;
    
    for(const item of list){
        if(item == "("){
            queue.push('(')
        }else{
            if(!queue[idx]){
                return false;
            }
            idx++;
        }
    }
        
    if(queue[idx]){
        return false;
    }
    
    return true;
        
}
    