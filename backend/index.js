const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const path=require("path")

dotenv.config();

const app = express();

connectDB();


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(express.json()); 
app.use(cookieParser()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const authRoutes = require("./routes/authRoutes");
const profileRoutes=require("./routes/profileRoutes")
app.use("/api/auth", authRoutes);
app.use("/api/profiles",profileRoutes)


app.get("/", (req, res) => {
  return res.json("Hi there");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
