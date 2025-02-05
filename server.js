/*
    ไฟล์ที่ใช้ในการสร้าง web server  รวมถึงการใช้งาน middleware
*/

//นำเข้าเพื่อเรียกใช้งาน module ต่างๆ ที่ต้องใช้งาน
const express = require("express"); //จัดการส่วนต่างๆ ของ Backend
const bodyParse = require("body-parser"); //จัดการข้อมูลที่เป็น JSON
const cors = require("cors"); //จัดการเรียกใช้งานข้ามโดเมน

//นำเข้า traveller.route.js, travel.route.js เพื่อจัดการเส้นทางการเข้าถึงข้อมูล
const travellerRoute = require("./routes/traveller.route.js");
const travelRoute = require("./routes/travel.route.js");

//เรียกใช้งานไฟล์ .env เพื่อใช้งานค่าที่กำหนดอยู่ในไฟล์ .env
require("dotenv").config();

//สร้าง web server
const app = express();

//สร้างตัวแปรเพื่อเก็บค่าที่อยู่ใน .env เพื่อเอาไปใช้งาน ทั้งนี้หากำม่มีค่าใน .env
// จะใช้ค่า default แทน ในนี้คือ 5000
const PORT = process.env.PORT || 5000;

//ใช้ middleware ในการจัดการต่างๆ
//จัดการข้อมูลที่เป็น JSON
app.use(bodyParse.json());
//หรือใช้จัดการข้อมูลที่เป็น JSON แทนได้
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//จัดการเรื่องการเรียกใช้งานข้ามโดเมน
app.use(cors());
//การจัดการเส้นทางหรือกำหนดตัว endpoint ด้วย middleware
//จัดการเส้นทางการเข้าถึง เพื่อทำงานกับ traveller_tb
app.use("/traveller", travellerRoute);
//จัดการเส้นทางการเข้าถึง เพื่อทำงานกับ travel_tb
app.use("/travel", travelRoute);
//จัดการเส้นทางการเข้าถึงรูปภาพ
app.use("/images/traveller", express.static("images/traveller"));
app.use("/images/travel", express.static("images/travel"));

//เทสการเรียกใช้งาน web server จาก client/user/ระบบอื่นๆ
app.get("/", (req, res) => {
  res.json({ message: "Hello from Back-end server!" });
});

//สร้างช่องทางในการติดต่อ web server นี้จาก client/user
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT + "...");
});