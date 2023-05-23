import express from "express";
import { Request, Response } from "express";
import dotenv from 'dotenv';
import { myDataSource } from "./app-data-source"
import routes from "./routes";
dotenv.config();

// create and setup express app
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000;

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.get("/healthCheck", (req: Request, res: Response) => {
            res.status(200).send("server is working")
        })
        
        app.use('/api', routes);
        
        app.listen(port, () => {
            console.log(`server started on port : ${port}`)
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })



