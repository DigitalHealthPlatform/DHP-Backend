import DoctorModel from "../models/Doctors_models.js";
import { doctorSchema } from "../schema/doctor_Schema.js";
import AdminModel from "../models/admin_model.js";
import { adminSignupSchema } from "../schema/Admin_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




// Sign Up Controller
export const signUp = async (req, res) => {
  try {
    const { error } = adminSignupSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { firstName, lastName, email, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) return res.status(400).send('Admin already registered.');

    const admin = new AdminModel({ firstName, lastName, email, password });
    await admin.save();

    res.status(201).send('Admin registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(404).send('Admin not found');

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add Doctor Controller
export const addDoctor = async (req, res) => {
  try {
    const { error } = doctorSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const doctor = new DoctorModel(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(500).send(error.message);
  }
};