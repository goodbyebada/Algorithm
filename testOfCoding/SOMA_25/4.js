/**
 *
 * 최대 n개 게임, 최대 n명 유저
 * -> 빈자리 우선 배정이다.
 * play가 끝나면 자리가 난다.
 * play가 끝나고 대기하고 있는 유저 중, premium_user가 있다면, 먼저 자리를 내어준다.
 * 동시에 접속한 유저는 없다.
 *
 * 
 *  1<= n <= 100
 * users <= 10000
 * preminum_users <= 10000
 * //shift 사용시 100 *(20000) -> 1초는 안 넘는다
 * 
 *
 *  t: 접속한 시간
 *  p: play 시간 -> 할당된 후 p분동안 Play
 * users = [[t,p]]
 * premium_users = [[t,p]]
 *
 * --- 당시 풀이
 * 1. game 큐를 만든다.
 * 2. n길이의 list를 만들고, 0으로 초기화를 한다.
 * 3. game list 값이 0이라면, 접속한 순으로 배정한다.
 * 	game 배열에 p의 값을 넣는다.
 * 	usersT[userIdx] > premium_usersT[premiumUserIdx]  premiumUserIdx++
 * 	else userIdx++
 * 4.game을 오름차순으로 sort한다.
 * 
 * 
 * //shift 사용한다 가정
 * 4.  game val이 0이 아니라면 
 * 		1. premiun users front와 비교한다.  
 * 			premiun users.front[0] // 접속 시간
			//permium 유저가 들어와 있느냐 
 * 			game[현재인덱스 ] >= premiun users.front[0]  premium users[0]의 p의 값을 넣는다.
 * 			else  users[0]의 p의 값을 넣는다.
 * 	
 * 5. 플레이가 끝나기 전에 접속한 유저가 있다면,
 *   1) 프리미엄 유저 시간이 <= game[] , 프리미엄 시간을 넣는다.
 * 	 2) else if ,유저 시간이 <= game[], 유저 시간을 넣는다
 * 6. 위의 경우가 아니라면, 플레이가 끝난 후(초과) 들어온 것  -> 선착순
 * 	  둘 중 접속시간이 작은 것으로 넣는다.
 *
 * --- answer
 * 1. 일반 유저가 기다린 시간의 합
 *2. 프리미엄 유저가 기다린 시간의 합
	[1의 값, 2의 값]
 */

function sol(users, premium_users, n) {
  const games = new Array(n).fill(0);
  const frontIdx = 0;

  //   당시 구현..
  //   기억이 잘 안난ㄴ다...
  while (users.length !== 0 && premium_users.length !== 0) {
    if (users.length > 0 && premium_users.length === 0) {
      const [pT, pP] = premium_users.shift();
    }
    const [uT, uP] = users.shift();
    const [pT, pP] = premium_users.shift();
  }
}

function reSol(users, premium_users, n) {
  const games = new Array(n).fill(0);

  let gameIdx = 0;
  let userIdx = 0;
  let perimiumIdx = 0;

  //  game이
  //   n만큼 계속 돌아야됨

  while (1) {
    // 선착순으로 넣는다.

    if (userIdx === users.length && perimiumIdx === premium_users.length) break;

    // premium users 만 있을때
    if (userIdx === users.length && perimiumIdx < premium_users.length) {
      const [pT, pP] = premium_users[perimiumIdx];
      perimiumIdx++;
      games[gameIdx] = pP;
      gameIdx = (gameIdx + 1) % n;
      continue;
    }

    //  users 만 있을때
    if (userIdx < users.length && perimiumIdx === premium_users.length) {
      const [uT, uP] = users[userIdx];
      userIdx++;
      games[gameIdx] = uP;
      gameIdx = (gameIdx + 1) % n;
      continue;
    }

    //  둘 다 있을때

    const [uT, uP] = users[userIdx];
    const [pT, pP] = premium_users[perimiumIdx];

    // 0일때
    if (games[gameIdx] === 0) {
      if (uT < pT) {
        userIdx++;
        games[gameIdx] = uP;
      } else {
        perimiumIdx++;
        games[gameIdx] = pP;
      }

      gameIdx = (gameIdx + 1) % n;
      continue;
    }

    // premium이 (게임 플레이 끝날때 + 끝나기 이전에 접속했다면
    if (pT <= games[gameIdx]) {
      perimiumIdx++;
      games[gameIdx] = pP;
      gameIdx = (gameIdx + 1) % n;
      continue;
    }

    // user이 (게임 플레이 끝날때 + 끝나기 이전에 접속했다면
    if (uT <= games[gameIdx]) {
      userIdx++;
      games[gameIdx] = uP;
      gameIdx = (gameIdx + 1) % n;
      continue;
    }

    // 이외에라면 선착 순
    if (pT <= uT) {
      perimiumIdx++;
      games[gameIdx] = pP;
      gameIdx = (gameIdx + 1) % n;
    } else {
      userIdx++;
      games[gameIdx] = uP;
      gameIdx = (gameIdx + 1) % n;
    }
  }
}

function giveGameToUser(user, userIdx, games, gameIdx, n) {
  games[gameIdx] = user[userIdx][1];
  return [gameIdx++ % n, userIdx];
}

function giveGameToPremium(premium, premiumIdx, games, gameIdx, n) {
  games[gameIdx] = premium[premiumIdx][1];

  return [gameIdx++ % n, premiumIdx];
}
