import express from "express";
import { dbconnection } from "./config/db.js";
import {userRouter} from "./routes/user_routes.js";
import adminRouter from "./routes/Admin_route.js";
import DoctorRouter from "./routes/Doctors_routes.js";
import appointmentRouter from "./routes/appointment_routes.js";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import expressOasGenerator from "express-oas-generator";
import MongoStore from "connect-mongo";




const app = express();

dbconnection();

expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags: ["auth", "users", "admin", "appointment"],
    mongooseModels: mongoose.modelNames(),
});

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








app.use('/api-docs',userRouter);
app.use( '/api-docs',  adminRouter);
app.use( '/api-docs' , DoctorRouter);
app.use( '/api-docs',  appointmentRouter);

expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect("/api-docs"));



app.listen(3200, ()=>
    console.log('server is running')
);



