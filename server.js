const express = require('express');//เรียกใช้งาน express moduleเพื่อสร้างเว็บเซิร์ฟเวอร์
require('dotenv').config();//เรียกใช้งาน dotenv module เพื่อเรียกใช้งานไฟล์ .env 

const app = express();//สร้างweb server
const PORT = process.env.PORT || 4000;



app.get('/', (req, res) => {
    res.json({message:'Hello From Tanawat DTI-SAU Server!'});//สร้างเส้นทางเว็บเพจหลัก
});


//สร้างช่องทางในการติดต่อweb server นี้จาก client /user
app.listen(PORT, () => {
    console.log("Server is running on Port " + PORT + "...");   
});
