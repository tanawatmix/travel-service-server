//ไฟล์นี้ใช้ในการจัดการเส้นทางในการเรียกใช้งานservice / api
const travelCtrl = require('./../controllers/travel.controller.js');

//เรียกใช้งาน express เพื่อใช้ router ในการจัดการเส้นทาง 
const express = require('express');
const router = express.Router();

//ในการกำหนดเส้นทางเป็นตามหลักของ rest api
//เพิ่ม post() แก้ไข put() ลบ delete() และ ค้นหา/ตรวจสอบ/ดึงข้อมูล get()

router.post("/",travelCtrl.uploadTravel, travelCtrl.createTravel);

router.put("/:travelId", travelCtrl.editTravel);

router.get("/:travellerId", travelCtrl.getAllTravel);

router.delete("/:travelId", travelCtrl.deleteTravel);


//export router ออกไปใช้งาน
module.exports = router;