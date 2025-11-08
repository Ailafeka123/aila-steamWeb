# steam 遊戲消息

主要目的:

串接steam提供的API，進行查詢。

目前打算是想做，查詢、預覽等功能，用途就只是查詢，不會有任何的push、update、delete的行為。

後續由於steam的限制，預計配合steamSpa + firebase去做。


## 技術使用

- 前端:
  1. React + TypeScript:主框架
  2. Vite : 開發工具
  3. React-router-dom : SPA轉跳

- 後端:
  1. vercel  : 部屬平台
  2. firestore : 提供讀取、篩選等功能。
