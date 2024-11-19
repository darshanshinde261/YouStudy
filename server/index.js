const express = require("express");

const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/profileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:["http://localhost:3000", "https://tiny-tapioca-54dfc2.netlify.app"],
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
//cloudinary
cloudinaryConnect();

//mount rout
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
//def routes
app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"You server is up and running",
    });
});

app.listen(PORT,()=>{
    console.log("app is running at 4000")
})
