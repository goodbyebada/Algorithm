#include <iostream>
#include <vector>

using namespace std;

vector<bool> getIsPrimeList(int num) {
    vector<bool> isPrime(num + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= num; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= num; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
}

int nextVal(const vector<bool>& primeList, int curIdx) {
    for (size_t idx = curIdx + 1; idx < primeList.size(); idx++) {
        if (primeList[idx]) {
            return idx;
        }
    }
    return primeList.size();
}

int twoPointerProcess(const vector<bool>& primeList, int num) {
    int count = 0;
    int start = 2, end = 2, sum = 0;
    
    while (true) {
        if (sum == num) count++;
        
        if (sum < num) {
            if (end >= primeList.size()) break;
            sum += end;
            end = nextVal(primeList, end);
        } else {
            if (start >= primeList.size()) break;
            sum -= start;
            start = nextVal(primeList, start);
        }
    }
    return count;
}

void prevSol(int input) {
    vector<bool> primeList = getIsPrimeList(input);
    int count = twoPointerProcess(primeList, input);
    cout << count << endl;
}

int main() {
    int input;
    cin >> input;
    prevSol(input);
    return 0;
}