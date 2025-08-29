function solution(s) {
    var answer = true;
    
    var regex = /^\d{6}$|^\d{4}$/;


    
    if(s.length === 4 || s.length === 6){
        
        for(const char of s){
            if(isNaN(char)) return false
        }
        
    return true
    }    
    
    return false
    

}