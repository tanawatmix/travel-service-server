//File that writes control operations for a table in the database
//เช่น insert, update, delete, select
//This file works with traveller_tb\
const multer = require("multer");
const Traveller = require("./../models/traveller.model.js")
const path = require("path");


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
exports.createTraveller = async (req, res) =>{
    try{
        //ตัวแปร 
        let data ={
            ...req.body,
            travellerImage: req.file.path.replace("images\\traveller\\", "")
        }
        const result = await Traveller.create(data);
        res.status(201).json({
            message:"Traveller created successfully",
            data: result
        });
    }   catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};

//func check login in traveller_tb ====================================================
exports.checkLoginTraveller = async (req,res) => {
    try{
        const result = await Traveller.findOne({
            where: {
                travellerEmail: req.params.travellerEmail ,
                travellerPassword: req.params.travellerPassword ,
            }
        });
        if (result){
            res.status(200).json({
                message: "Traveller login succesfully",
                data: result
            })
        } else {
            res.status(404).json({
                message: "Traveller login failed",
                data: result
            })
        }
    }   catch (error){
        res.status(500).json({
            message: error.message
        });
    }

}

//func edit profile user in traveller_tb =====================================================
exports.editTraveller = async (req, res) => {
    try{
        const result = await Traveller.update(req.body, {
            where: {
                travellerId: req.params.travellerId
            }
        });
        res.status(200).json({
            message: "Traveller updated successfully",
            data: result
        });
    }   catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

//Traveller Image upload function==========================================
const storage = multer .diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/traveller')
    },
    filename: function (req, file, cb) {
        cb(null, 'traveller_' + Math.floor(Math.random() * Date.now()) + path.extname(file.originalname))
    }
})
exports.uploadTraveller = multer({ 
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Images Only!');
    }
}).single('travellerImage');