//fileที่ทำงานหรือแมปกับ table ใน database 
const sequelize = require('sequelize');
const db = require('../db/db.js');



//สร้างmodel ของตาราง travel
const Travel = db.define("travel_tb", { 
    travelId: { 
        type: sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false,
        field: "travelId"
    },
    travelPlace: { 
        type: sequelize.STRING(200),
        allowNull: false,
        field: "travelPlace"
    },
    travelStartDate: { 
        type: sequelize.STRING(30),
        allowNull: false,
        field: "travelStartDate"
    },
    travelEndDate: {
        type: sequelize.STRING(30),
        allowNull: false,
        field: "travelEndDate"
    },
    travelCostTotal: {
        type: sequelize.DOUBLE,
        allowNull: false,
        field: "travelCostTotal"
    },
    travellerId: { 
        type: sequelize.INTEGER,
        allowNull: false,
        field: "travellerId"
    },
    travelImage: {
        type: sequelize.STRING(150),
        allowNull: false,
        field: "travelImage"
    }
}, 
{ 
    tableName: "travel_tb",
    timestamps: false,
    freezeTableName: true,
});


//export ตาราง traveller ออกไปใช้งาน
module.exports = Travel;



