#include <iostream>
#include <string>
#define endl "\n";
using namespace std; 

/*
1. ���ڿ��� �޴´�
2. �հ� ���� ���ÿ� �ε����� �ϳ��� �ٿ����鼭 ���Ѵ�
3. ���ڿ��� ���̰� ¦����� end - begin = 1 �϶� �����
  Ȧ����� begin == end �����

==begin > end ����� 
while ( begin <= end) 
4. �ٸ��ٸ� no ��� 

*/

int lessMemory_check(){
	
	while(1){
		
		int n;
		if(!n) break;
		int q=0, m= n;
		while(n){
			
			q = 10*q+ n%10;
			// n�� ���� �ڸ� ��
			n /= 10;
			// n�� ��, �� �� ������ �ڸ��� ������ ������ �� 
			
			// ���ڸ� �Ųٷ� �����´�. 
			// q*10 �ڸ����� ������ ���� + ������ �� ������ �ڸ� ��
			// n�� 10���� ������ ����? �� ���� �ִ� �ڸ� ���� �����ϱ� ���ؼ�  
		}
		
		if( q == n) cout << "yes" << endl;
		else cout << "no" << endl;
	}
}

int check(string str){
	
		int begin = 0;
		int end = str.size()-1;
			
		while(begin <= end){
			if(str[begin] != str[end]){
				cout << "no" << endl;
				return 0;		
			}
			
			begin++;
			end--;
			
		}
		
	cout << "yes" << endl;
	
	
	
	return 0;
}

int main(){
	
	string str;
	
	while(1){
		cin >> str;
		if(str == "0"){
			return 0;
		}
		check(str);
	}


}
