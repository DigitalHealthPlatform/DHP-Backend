import express from "express";
import { dbconnection } from "./config/db.js";
import {userRouter} from "./routes/user_routes.js";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import MongoStore from "connect-mongo";


const app = express();

app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
//   cookie: { secure: true },

   store: MongoStore.create({
      mongoUrl: process.env.Mongo_Url
})

})
)

expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags: ["auth"],
    mongooseModels: mongoose.modelNames(),
});


dbconnection();

app.use(userRouter);


app.listen(3200, ()=>
    console.log('server is running')
);



