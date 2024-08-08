import DoctorModel from "../models/Doctors_models.js";
import { doctorSchema } from "../schema/Doctors_schema.js";



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

export const assignDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(req.params.id, { availability: true }, { new: true });
    if (!doctor) return res.status(404).send('Doctor not found');
    res.send(doctor);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const requestConsultation = async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.id);
    if (!doctor) return res.status(404).send('Doctor not found');
    if (!doctor.availability) return res.status(400).send('Doctor is not available');
    
    // Additional logic for requesting consultation
    res.send('Consultation requested');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
