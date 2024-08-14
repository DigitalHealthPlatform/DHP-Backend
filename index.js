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
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";




const app = express();

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'DHP API Documentation',
//             version: '1.0.0',
//         },
//         servers: [
//             {
//                 url: process.env.BASE_URL || 'http://localhost:3200',
//             },
//         ],
//     },
//     apis: ['./routes/*_routes.js'], 
// };

// const swaggerSpec = swaggerJSDoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Applying middlware
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

expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags: ["auth", "user", "admin", "appointment", "Doctor"],
    mongooseModels: mongoose.modelNames(),
});


dbconnection();







app.use('/api',userRouter);
app.use( '/api',  adminRouter);
app.use( '/api' , DoctorRouter);
app.use( '/api',  appointmentRouter);

app.use('/', (req, res)=> res.redirect("/api-docs"));



expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect("/api-docs"));



app.listen(3200, ()=>
    console.log('server is running')
);



