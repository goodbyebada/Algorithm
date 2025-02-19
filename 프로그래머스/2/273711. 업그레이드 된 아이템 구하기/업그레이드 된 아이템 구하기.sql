-- 코드를 작성해주세요

# 희귀도가 'RARE'
# 다음 업그레이드 아이템
# PARENT -> 업그레이드 전 아이템

# 언제  T.ITEM_ID를 해야해?
# 왜 JOIN 했는데 왜 T.ITEM_ID I.ITEM_ID가 존재하는가..

SELECT I.ITEM_ID, ITEM_NAME, RARITY
FROM ITEM_TREE as T JOIN ITEM_INFO as I ON T.ITEM_ID = I.ITEM_ID
WHERE T.PARENT_ITEM_ID IN (
    SELECT ITEM_ID
    FROM ITEM_INFO
    WHERE RARITY = 'RARE'
) AND PARENT_ITEM_ID IS NOT NULL
ORDER BY T.ITEM_ID DESC