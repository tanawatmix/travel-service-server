/*
    ไฟล์ที่แมปข้อมูลกับตารางในฐานข้อมูล เพื่อการทำงานใดๆ กับตารางนั้นๆ
*/

//นำเข้าเพื่อเรียกใช้งาน module ต่างๆ ที่ต้องใช้งาน
const Sequelize = require("sequelize"); //จัดการการทำงานกับ database

//นำเข้า db.js ในการเชื่อมต่อกับ database
const db = require("./../db/db.js");

//สร้าง model เพื่อแมปกับ table ใน database
const Travel = db.define(
  "travel_tb",
  {
    travelId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "travelId",
    },
    travelPlace: {
      type: Sequelize.STRING(200),
      allowNull: false,
      field: "travelPlace",
    },
    travelStartDate: {
      type: Sequelize.STRING(30),
      allowNull: false,
      field: "travelStartDate",
    },
    travelEndDate: {
      type: Sequelize.STRING(30),
      allowNull: false,
      field: "travelEndDate",
    },
    travelCostTotal: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      field: "travelCostTotal",
    },
    travellerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "travellerId",
    },
    travelImage: {
      type: Sequelize.STRING(150),
      allowNull: false,
      field: "travelImage",
    },
  },
  {
    tableName: "travel_tb",
    timestamps: false, //ถ้าต้องการให้ในตารางมีการเก็บวันเวลาที่เป็น Timestamp ก็ให้เป็น true
    freezeTableName: true,
  }
);

//export model ออกไปเพื่อการเรียกใช้งาน
module.exports = Travel;