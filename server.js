const express = require("express"); // call express module to create web server
const bodyParser = require("body-parser");
const cors = require("cors");
const travellerRoute = require("./routes/traveller.route"); // call to use router module
const travelRoute = require("./routes/travel.route");
require("dotenv").config(); // call to use .env

const app = express(); // create web server
const PORT = process.env.PORT || 3000;

//use middleware to จัดการต่าง
app.use(bodyParser.json());//adjust json data
app.use(cors());//allow access from any domain

app.use("/traveller", travellerRoute); //use router module
app.use("/travel", travelRoute);
app.use("/images/traveller", 
  express.static("images/traveller"));
app.use("/images/travel", express.static("images/travel"));

//test call web server
app.get("/", (req, res) => {
  res.json({ message: "Hello from server port " + PORT + " DTI SAU 555" }); //send message
});

//create web server connection from client/user
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});