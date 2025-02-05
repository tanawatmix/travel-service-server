/*
    ไฟล์ที่กำหนดการทำงานต่างๆ กับ table ใน database
    เช่น การเพิ่ม (insert/create), การแก้ไข (update),
    การลบ (delete), การค้นหา/ตรวจสอบ/ดึง/ดู (select/sead)
*/

//นำเข้าเพื่อเรียกใช้งาน module ต่างๆ ที่ต้องใช้งาน
const multer = require("multer"); //จัดการการอัปโหลดไฟล์
const path = require("path"); //จัดการ path หรือตำแหน่งที่อยู่ของไฟล์
const fs = require("fs"); //จัดการไฟล์

//นำเข้า traveller.model.js เพื่อทำงานกับ traveller_tb
const Traveller = require("./../models/traveller.model.js");

//การอัปโหลดไฟล์
//กำหนดค่าตำแหน่งที่อยู่ของไฟล์ และตั้งชื่อไฟล์ใหม่สำหรับไฟล์ที่อัปโหลดมา
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/traveller");
  },
  filename: (req, file, cb) => {
    cb(null, "traveller_" + Math.floor(Math.random() * Date.now()) + path.extname(file.originalname));
  },
});
//ฟังก์ชันเพื่อการอัปโหลดไฟล์
exports.uploadTraveller = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only");
  },
}).single("travellerImage");

//ฟังก์ชันเพิ่มข้อมูลลงในตาราง traveller_tb
//กรณีไม่มีการอัปโหลดไฟล์
// exports.createTraveller = async (req, res) => {
//     try {
//         const result = await Traveller.create(req.body);
//         res.status(201).json({
//             message: "Traveller created successfully",
//             data: result
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
//กรณีมีการอัปโหลดไฟล์ แต่จะเลือกรูปอัปโหลดหรือไม่เลือกก็ได้ก็จะเก็บค่าว่างแทน
exports.createTraveller = async (req, res) => {
  try {
    //ตัวแปรเก็บข้อมูลที่ส่งมากับข้อมูลรูปภาพที่จะเอาไปบันทึกใน Table
    //ตรวจสอบหากไม่มีการอัปโหลดรูปมาจะเก็บค่าว่างแทน
    let data = {
      ...req.body,
      travellerImage: req.file ? req.file.path.replace("images\\traveller\\", "") : "",
    };

    const result = await Traveller.create(data);

    res.status(201).json({
      message: "Traveller created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//ฟังก์ชันตรวจสอบการเข้าใช้งานของผู้ใช้กับตาราง traveller_tb
exports.checkLoginTraveller = async (req, res) => {
  try {
    const result = await Traveller.findOne({
      where: {
        travellerEmail: req.params.travellerEmail,
        travellerPassword: req.params.travellerPassword,
      },
    });
    if (result) {
      res.status(200).json({
        message: "Traveller login successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Traveller login failed",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//ฟังก์ชันแก้ไขข้อมูลส่วนตัวของผู้ใช้งานกับตาราง traveller_tb
//กรณีไม่มีการอัปโหลดไฟล์
// exports.editTraveller = async (req, res) => {
//   try {
//     const result = await Traveller.update(req.body, {
//       where: {
//         travellerId: req.params.travellerId,
//       },
//     });
//     res.status(200).json({
//       message: "Traveller updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//กรณีมีการอัปโหลดไฟล์ แต่จะเลือกรูปอัปโหลดเพื่อแก้ไข หรือไม่เลือกก็ได้ก็จะเก็บค่าเดิมแทน
exports.editTraveller = async (req, res) => {
  try {
    //ตัวแปรเก็บข้อมูลที่ส่งมากับข้อมูลรูปภาพที่จะเอาไปบันทึกใน Table
    let data = {
      ...req.body,
    };
    //กรณีมีการอัปโหลดรูปภาพมาจะแทนด้วยรูปภาพใหม่  แต่หากไม่มีการอัปโหลดรูปภาพมาจะเก็บค่าเดิมแทน
    if (req.file) {
      // ค้นหาข้อมูลเดิมก่อนอัปเดต
      const traveller = await Traveller.findOne({
        where: { travellerId: req.params.travellerId },
      });

      // ลบไฟล์เดิมหากมีอยู่
      if (traveller.travellerImage) {
        const oldImagePath = path.join("images/traveller", traveller.travellerImage);
        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Failed to delete old image:", err);
          }
        });
      }

      data.travellerImage = req.file.path.replace("images\\traveller\\", "");
    } else {
      delete data.travellerImage;
    }

    const result = await Traveller.update(data, {
      where: {
        travellerId: req.params.travellerId,
      },
    });

    if(result){
      const resultupdate = await Traveller.findOne({
        where: { travellerId: req.params.travellerId },
      });

      res.status(200).json({
        message: "Traveller updated successfully",
        data: resultupdate,
      });

    }
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};