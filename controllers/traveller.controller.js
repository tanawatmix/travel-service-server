const { where } = require('sequelize');
const Traveller = require('../models/traveller.model.js');

// ฟังค์ชั่นเพิ่มข้อมูลลงตาราง traveller_tb
exports.createTraveller = async (req, res) => {
    try {
        const result = await Traveller.create(req.body);
        res.status(201).json({ 
            message: "Traveller was created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//ฟังชั่นตรวจจสอบการใช้งานของผู้ใช้งานกับตาราง traveller_tb
exports.checkLoginTraveller = async (req, res) => { 
    try {
        const result = await Traveller.findOne({
            where: {
                travellerEmail: req.params.travellerEmail,
                travellerPassword: req.params.travellerPassword
            }
        });
        if(result){
            res.status(200).json({ 
                message: "Traveller login successfully",
                data: result
            });
        }else{
            res.status(404).json({
                message: "Traveller login failed",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({message: err.message});
    }
}

//ฟังชั่นแก้ไขข้อมูลส่วนตัวของผู้ใช้งานจากตาราง traveller_tb
exports.editTraveller = async (req, res) => {
    try {
        const result = await Traveller.update(req.body, {
           where: { 
                travellerId: req.params.travellerId,
           } 
        });
        res.status(200).json({
            message: "Traveller updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}






