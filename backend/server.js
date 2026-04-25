// server.js

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import trackingRoutes from "./routes/trackingRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", trackingRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

//mongodb+srv://<db_username>:<db_password>@cluster0.ljc1mek.mongodb.net/?appName=Cluster0