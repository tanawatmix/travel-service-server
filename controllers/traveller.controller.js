//File that writes control operations for a table in the database
//เช่น insert, update, delete, select
//This file works with traveller_tb\
const multer = require("multer");
const Traveller = require("./../models/traveller.model.js");
const path = require("path");
const fs = require("fs");

//fuction insert data to traveller_tb ====================================================
//ฟังก์ชันเพิ่มข้อมูลลงใน travel_tb
// exports.createTravel = async (req, res) => {
//   try {
//     const result = await Travel.create(req.body);
//     res.status(201).json({
//       message: "Travel created successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.createTraveller = async (req, res) => {
  try {
    //ตัวแปร
    let data = {
      ...req.body,
      //เช็คว่ามีไฟล์รูปภาพหรือไม่
      travellerImage: req.file
        ? req.file.path.replace("images\\traveller\\", "")
        : "",
    };

    const result = await Traveller.create(data);

    res.status(201).json({
      message: "Traveller created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//func check login in traveller_tb ====================================================
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
        message: "Traveller login succesfully",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Traveller login failed",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//func edit profile user in traveller_tb =====================================================
exports.editTraveller = async (req, res) => {
  try {
    //มีการตรวจสอบก่อนว่ามีไฟล์ที่อัปโหลดหรือไม่
    //กรณีที่มีร ตรวจสอบก่อนว่ามีไฟล์ที่อัปโหลดหรือไม่ ถ้ามีให้ลบไฟล์เก่าทิ้งไปด้วย
    let data = {
      ...req.body,
    };
    if (req.file) { //ค้นหาเพื่อเอารูป
      const traveller = await Traveller.findOne({
        where: {
          travellerId: req.params.travellerId,
        },
      });

      if (traveller.travellerImage) {
        //ตรวจสอบกรณีที่มีรูป
        const oldImagePath = "images/traveller/" + traveller.travellerImage; //ลบไฟล์เก่าทิ้ง
        fs.unlink(oldImagePath,(err) => {console.log(err)});
      }
      data.travellerImage = req.file.path.replace("images\\traveller\\", "");
    }else{
        delete data.travellerImage
    }
  
      const result = await Traveller.update(data, {
        where: {
          travellerId: req.params.travellerId,
        },
      });
      res.status(200).json({
        message: "Traveller updated successfully",
        data: result,
      });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//func Delete Traveller in traveller_tb ====================================================
exports.deleteTraveller = async (req, res) => {
  try {
    
    //ค้นหาเพื่อเอารูป
      const traveller = await Traveller.findOne({
        where: {
          travellerId: req.params.travellerId,
        },
      });

      if (traveller.travellerImage) {
        //ตรวจสอบกรณีที่มีรูป
        const oldImagePath = "images/traveller/" + traveller.travellerImage; //ลบไฟล์เก่าทิ้ง
        fs.unlink(oldImagePath,(err) => {console.log(err)});
    }
    const result = await Traveller.destroy({
      where: {
        travellerId: req.params.travellerId,
      },
    });
    res.status(200).json({
      message: "Traveller deeleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//Traveller Image upload function==========================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/traveller");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "traveller_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});
exports.uploadTraveller = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only!");
  },
}).single("travellerImage");