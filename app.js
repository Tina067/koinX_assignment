import { startCronJob } from "./controllers/cronJob.js";
import express, { json } from "express";
import { config } from "dotenv";
import  koinxRoute  from "./routes/allRoutes.js"
import { connectDB } from "./db/db.js";
config();

// Sample user data
let PORT = process.env.PORT
const app = express()
app.use(express.json());
app.use(koinxRoute)

connectDB()

// Background job to update cryptocurrencies every hour
startCronJob();


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


