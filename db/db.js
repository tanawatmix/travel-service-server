//fileที่ใช้ติดต่อกับdatabase
const Sequelize = require('sequelize');

//เรียกใช้งาน dotenv module เพื่อเรียกใช้งานไฟล์ .env
require("dotenv").config();

//สร้างinstance ของ database ด้วย sequelize
const sequelize = new Sequelize( 
    process.env.DB_NAME, //ชื่อdatabase
    process.env.DB_USER, //ชื่อผู้ใช้
    process.env.DB_PASS, //รหัสผ่าน
    {
        host: process.env.DB_HOST,
        port : process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        
    }
);


//เชื่อมต่อ Database
sequelize.sync().then(() => {
    console.log("Database connected....");
}).catch((err) => {
    console.log("Database connection error: " + err);
});

//export instance ของ database ออกไปใช้งาน
module.exports = sequelize;


