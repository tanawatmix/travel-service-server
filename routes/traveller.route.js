const travellerCtrl = require('./../controllers/traveller.controller.js');

//เรียกใช้งาน express เพื่อใช้ router ในการจัดการเส้นทาง 
const express = require('express');
const router = express.Router();

//ในการกำหนดเส้นทางเป็นตามหลักของ rest api
//เพิ่ม post() แก้ไข put() ลบ delete() และ ค้นหา/ตรวจสอบ/ดึงข้อมูล get()

router.post("/", travellerCtrl.createTraveller);

router.get("/:travellerEmail/:travellerPassword", travellerCtrl.checkLoginTraveller);

router.put("/:travellerId", travellerCtrl.editTraveller);

//export router ออกไปใช้งาน
module.exports = router;