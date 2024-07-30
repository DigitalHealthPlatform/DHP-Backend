import express from "express"
import { dbconnection } from "./config/db.js";

const app = express();

dbconnection();

app.listen(3200, ()=>
    console.log('server is running')
);



