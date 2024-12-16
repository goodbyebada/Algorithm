/dev/stdin
UNIX 및 유닉스 계열 운영체제에서 사용되는 특별한 파일 시스템 경로
이 경로는 표준 입력 스트림을 나타낸다
사용자로부터 데이터를 가져올 수 있는 가상의 파일로, 키보드 입력이나 다른 출력의 프로그램을 리디렉션 할 수 있다.

**.toString()?**
readFileSync의 인코딩 방법을 정해주지 않아 Buffer 객체로 반환되기 때문에 toString()을 써줘야한다.

**trim()?**

뒤에 오는 공백을 제거한다. 뒤의 공백으로 오류가 나는 것을 예방한다.

**split()?**

입력을 하나 하나 받아올 때는 split()을 사용

- split():

  문자열의 모든 문자를 원소로 가지는 배열을 반환한다.

띄어쓰기에 해당하는 값이라면 split(" ") 사용

행을 기준으로 나눌 때는 split("\n")을 사용

**map()**

모든 값들이 숫자로 받아오고 싶다면 map(Number)을 이용해 바꿔줄 수 있다.
입력의 개수가 하나일 경우 split과 map을 사용할 경우 오류가 날 수 있다.

ref: https://catnails.tistory.com/484
https://minjo0n.tistory.com/2#moveToInput

`fs.readFileSync('/dev/stdin')`를 사용하면 표준부터 데이터를 읽는것을 의미한다.
