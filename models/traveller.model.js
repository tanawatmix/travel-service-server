const Sequelize = require('sequelize');
const db = require('../db/db.js');



//สร้างmodel ของตาราง traveller
const Traveller = db.define("traveller_tb", { 
    travellerId: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false,
        field: "travellerId"
    },
    travellerFullname: { 
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "travellerFullname"
    },
    travellerEmail: { 
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "travellerEmail"
    },
    travellerPassword: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "travellerPassword"
    }
}, 
{ 
    tableName: "traveller_tb",
    timestamps: false,
    freezeTableName: true,
});


//export ตาราง traveller ออกไปใช้งาน
module.exports = Traveller;



