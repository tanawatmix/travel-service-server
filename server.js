const bodyParser = require('body-parser');
const express = require('express');//เรียกใช้งาน express moduleเพื่อสร้างเว็บเซิร์ฟเวอร์ 
const cors = require('cors');
const travellerRoute = require('./routes/traveller.route.js');
const travelRoute = require('./routes/travel.route.js');

require('dotenv').config();//เรียกใช้งาน dotenv module เพื่อเรียกใช้งานไฟล์ .env

const app = express();//สร้างweb server
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json()); // จัดการข้อมูลในjson
app.use(cors()); //จัดการเรื่องการเรียกใช้งานข้ามโดเมน
app.use("/traveller", travellerRoute);//เรียกใช้งานเส้นทางของ traveller
app.use("/travel", travelRoute);//เรียกใช้งานเส้นทางของ travel


app.get('/', (req, res) => {
    res.json({message:'Hello From Tanawat DTI-SAU Server!'});//สร้างเส้นทางเว็บเพจหลัก
});


//สร้างช่องทางในการติดต่อweb server นี้จาก client /user
app.listen(PORT, () => {
    console.log("Server is running on Port " + PORT + "...");   
});
