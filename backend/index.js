import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import subscriberRoute from "./routes/subscriber.route.js";
import morgan from "morgan";




dotenv.config({});

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5177" 
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
};


app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)
app.use("/api/v1", subscriberRoute);
"http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/update/Profile"

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
