import DoctorModel from '../models/Doctors_models.js';

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.send(doctors);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getDoctorsBySpecialty = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({ specialty: req.params.specialty });
    res.send(doctors);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
