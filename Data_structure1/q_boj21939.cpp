<<<<<<< HEAD
#include <bits/stdc++.h>
using namespace std;
 
set<pair<int, int>> db;
//set{} => binary search tree�� ������ �ִ�
 
map<int, int> dict;
//key, value  

//�� �˻��� 
// Set�� ������ ������� �ʰ� �ߺ��� ������� �ʴ´�
// Map�� ������ ������� �ʰ�, Key �ߺ��� ������� ������ Value�� �ߺ��� ���ȴ�.
 
 
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    int n, m; 
	cin >> n;
	
    for(int i = 0; i < n; i++){
        int p, l; 
        // p = ����  ��ȣ
		// l = ���� ���̵�  
		cin >> p >> l;
        db.insert({l, p});
        dict[p] = l;
        // dict[������ȣ] = ���� ���̵� ==> ������ȣ�� ���� ���̵��� ã�´� O(logN)  
    }
    
    cin >> m;
    
    for(int i = 0; i < m; i++){
        string op; 
		cin >> op;
 
        if(op == "add"){
            int p, l; 
			cin >> p >> l;
            db.insert({l, p});            
            dict[p] = l;
            // dict[������ȣ] = ���� ���̵� 
        }else if(op == "recommend"){
            int x; 
			cin >> x;
            if(x == -1){    // ���� ���� ������ ��ȣ�� ���
                cout << (*db.begin()).second << "\n";
                // db.begin() => �ּҰ� 
				//  *db.begin() => ��! 
            }else{  // x == 1, ���� ����� ������ ��ȣ�� ���
                cout << (*prev(db.end())).second << "\n";
                
			//prev() : ���� iterator���� ���ϴ� �Ÿ�(-n��) �Ÿ��� iterator�� ��ȯ�ϴ� �Լ�                
            }
        }else{  
		// op == "solved"
            int p; 
			cin >> p;
            db.erase({dict[p], p});
            //  �� set���� �ϸ� �ȵ�? solved ���� �ִ��� Ž���Ҷ� {l,p} �� ã�ƾ��ϴµ�
			// l�� �𸣴ϱ� �� ã�� => map�� m[key]  = value; ���̴ϱ� p�� l�� �� �� �ִ� 
			//�׷��� ������ map�� ���ٳ�  
            dict.erase(p);
            //solved ������ dict������ ����  
        }
    }
}
=======
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <stack>
#include <set>

using namespace std;

/*
둘 다 레드블랙트리 삽입/삭제/탐색 시간 복잡도 log(n)
set 사용 -> 중복된 값을 가지지 않는다

1. add p l
2. solved p  -> 문제 삭제
3. recommand x -> 문제 출력

*/

set<int> list;

int boj()
{
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    boj();
    return 0;
}
>>>>>>> cc0a11e (알고리즘)
