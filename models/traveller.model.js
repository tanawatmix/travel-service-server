/*
    ไฟล์ที่แมปข้อมูลกับตารางในฐานข้อมูล เพื่อการทำงานใดๆ กับตารางนั้นๆ
*/

//นำเข้าเพื่อเรียกใช้งาน module ต่างๆ ที่ต้องใช้งาน
const Sequelize = require("sequelize"); //จัดการการทำงานกับ database

//นำเข้า db.js ในการเชื่อมต่อกับ database
const db = require("./../db/db.js");

//สร้าง model เพื่อแมปกับ table ใน database
const Traveller = db.define(
  "traveller_tb",
  {
    travellerId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "travellerId",
    },
    travellerFullname: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: "travellerFullname",
    },
    travellerEmail: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: "travellerEmail",
    },
    travellerPassword: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: "travellerPassword",
    },
    travellerImage: {
      type: Sequelize.STRING(150),
      allowNull: true,
      field: "travellerImage",
    },
  },
  {
    tableName: "traveller_tb",
    timestamps: false, //ถ้าต้องการให้ในตารางมีการเก็บวันเวลาที่เป็น Timestamp ก็ให้เป็น true
    freezeTableName: true,
  }
);

//export model ออกไปเพื่อการเรียกใช้งาน
module.exports = Traveller;