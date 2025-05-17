


//  이 시간대 사람들의 (players)/m 개가 필요함
//  현재 있는 서버 먼저 업데이트  -> 사라지는 서버 
// 추가 증설 서버 = 필요한 서버 - (현재 있는 서버)
//  필요한 서버 > 현재 있는 서버 => 증설하는거임

function solution(players, m, k) {
    var answer = 0;
    let index = 0
    
    
    let currServer = 0
    let addedServer = 0
    const timeOut = Array(players.length).fill(0);
    
    
    for(let time =0; time < players.length; time++){
        const remove = timeOut[time]
        
        if(remove){
            currServer-= remove
        }
        
        const need = Math.floor(players[time]/m) - currServer
        
        if(need <= 0) continue;
    
        
        timeOut[time+k] = need
        addedServer+= need
        currServer+= need
    }
         
    return addedServer;
}