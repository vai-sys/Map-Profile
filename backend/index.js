const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


dotenv.config();

const app = express();

connectDB();


app.use(cors()); 
app.use(express.json()); 
app.use(cookieParser()); 


const authRoutes = require("./routes/authRoutes");
const profileRoutes=require("./routes/profileRoutes")
app.use("/api/auth", authRoutes);
app.use("/api/profile",profileRoutes)


app.get("/", (req, res) => {
  return res.json("Hi there");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
