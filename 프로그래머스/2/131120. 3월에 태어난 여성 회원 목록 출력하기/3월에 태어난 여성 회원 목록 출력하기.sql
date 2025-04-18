# -- 코드를 입력하세요
# # 회원 ID, 회원 이름, 회원 연락처, 성별, 생년월일
# # 전화번호가 Null인 경우 제외
# SELECT MEMBER_ID, MEMBER_NAME, TLNO, GENDER, DATE_OF_BIRTH
# FROM MEMBER_PROFILE
# WHERE GENDER = 'W'AND MONTH(DATE_OF_BIRTH) = 3
# AND TLNO IS NOT NULL
# ORDER BY MEMBER_ID



SELECT MEMBER_ID, MEMBER_NAME, GENDER,  DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') AS DATE_OF_BIRTH
FROM MEMBER_PROFILE
WHERE MONTH(DATE_OF_BIRTH)=3
      AND TLNO IS NOT NULL
      AND GENDER ='W'
ORDER BY MEMBER_ID;
