/*
    ไฟล์ที่กำหนด endpoint หรือเส้นทางเพื่อการเรียกใช้งาน
*/

//เรียกใช้งาน expesee เพื่อใช้งาน Router() ในการจัดการเส้นทางเพื่อการเรียกใช้งาน
const express = require("express"); //จัดการส่วนต่างๆ ของ Backend

//นำเข้า travel.controller.js เพื่อกำหนด endpoint หรือเส้นทาง
//ในการทำงานกับแต่ละฟังก์ชันใน travel.controller.js ที่ทำงานกับ travel_tb
const travelCtrl = require("./../controllers/travel.controller.js");

//เรียกใช้งาน Router() ในการจัดการเส้นทางเพื่อการเรียกใช้งาน
const router = express.Router();

//ในการกำหนดเส้นทางเป็นตามหลักการของ REST API
//เพิ่ม post(), แก้ไข put()/patch(), ลบ delete(), ค้นหา/ตรวจสอบ/ดึง/ดู get()
router.post("/", travelCtrl.uploadTravel, travelCtrl.createTravel);

router.put("/:travelId", travelCtrl.uploadTravel, travelCtrl.editTravel);

router.get("/:travellerId", travelCtrl.getAllTravel);

router.get("/only/:travelId", travelCtrl.getOnlyTravel);

router.delete("/:travelId", travelCtrl.deleteTravel);

//export router ออกไปเพื่อการเรียกใช้งาน
module.exports = router;