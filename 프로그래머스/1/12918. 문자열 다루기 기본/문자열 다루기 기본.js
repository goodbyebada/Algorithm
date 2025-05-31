function solution(s) {
    var answer = true;

    
    if(s.length === 4 || s.length === 6){
        
        for(const char of s){
            if(isNaN(char)) return false
        }
        
    return true
    }    
    
    return false
    

}