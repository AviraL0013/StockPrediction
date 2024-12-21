import dotenv from "dotenv";
import connectDB from "./db/index.js"; // Correctly specify the index file
import { app } from './app.js';

dotenv.config({
    path: "./env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    });
})
.catch(err => {
    console.error('Database connection error:', err);
});
