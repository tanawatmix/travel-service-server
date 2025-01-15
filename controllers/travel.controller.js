//ไฟล์ที่เขียนควบคุมการทำงานต่างๆ กับtable ใน database
//เช่น การเพิ่ม(insert) หารแก้ไข(update)
//การลบ(delete) การค้นหา,ตรวจสอบ,ดึง,ดู(select)
const Travel = require('../models/travel.model.js');

exports.createTravel = async (req, res) => {
    try {
        const result = await Travel.create(req.body);
        res.status(201).json({ 
            message: "Travel was created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({message: err.message});
    }
};
//แก้ไขข้อมูลในตาราง travel_tb ของนักเดินทางหนึ่ง
exports.editTravel = async (req, res) => {
    try {
        const result = await Travel.update(req.body, {
           where: { 
                travelId: req.params.travelId,
           } 
        });
        res.status(200).json({
            message: "Travel updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//ลบข้อมูลในตาราง travel_tb ของนักเดินทางหนึ่ง
exports.deleteTravel = async (req, res) => {
    try {
        const result = await Travel.destroy( {
           where: { 
                travelId: req.params.travelId,
           } 
        });
        res.status(200).json({
            message: "Travel deleted successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//ดึงข้อมูลทั้งหมดในตาราง travel_tb ของนักเดินทางหนึ่ง
exports.getAllTravel = async (req, res) => { 
    try {
        const result = await Travel.findAll({
            where: {
                travellerId: req.params.travellerId,
            }
        });
        if(result){
            res.status(200).json({ 
                message: "Travel get successfully",
                data: result
            });
        }else{
            res.status(404).json({
                message: "Travel get failed",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({message: err.message});
    }
}
