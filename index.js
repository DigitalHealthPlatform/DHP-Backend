import express from "express";
import { dbconnection } from "./config/db.js";
import {userRouter} from "./routes/user_routes.js";
import adminRouter from "./routes/Admin_route.js";
import DoctorRouter from "./routes/Doctors_routes.js";
import appointmentRouter from "./routes/appointment_routes.js";
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
);

app.get("/api-docs/health", (req, res) => {
    res.json({ status: "UP" });
  });


expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags: ["auth"],
    mongooseModels: mongoose.modelNames(),
});


dbconnection();

app.use('/api-docs',userRouter);
app.use( '/api-docs',  adminRouter);
app.use( '/api-docs' , DoctorRouter);
app.use( '/api-docs',  appointmentRouter);




app.listen(3200, ()=>
    console.log('server is running')
);



