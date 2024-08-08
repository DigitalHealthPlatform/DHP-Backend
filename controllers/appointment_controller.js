import Appointment from '../models/appointment_models.js';
import appointmentSchema from '../schema/appointment_schema.js';
import { sendNotification } from '../utils/notification.js';
import DoctorModel from '../models/Doctors_models.js';
import userModel from "../models/user_model.js";

// Schedule an appointment
export const scheduleAppointment = async (req, res) => {
  try {
    const { error } = appointmentSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const appointment = new Appointment(req.body);
    await appointment.save();

    // Notify doctor and patient
    const patient = await userModel.findById(req.body.patientId);
    const doctor = await DoctorModel.findById(req.body.doctorId);

    if (doctor && patient) {
      await sendNotification(doctor.email, 'New Appointment Scheduled', `You have a new appointment scheduled with ${patient.name} on ${appointment.appointmentDate}`);
      await sendNotification(patient.email, 'Appointment Confirmation', `Your appointment with Dr. ${doctor.name} is confirmed for ${appointment.appointmentDate}`);
    }

    res.status(201).send(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all appointments for a patient
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.patientId }).populate('doctorId');
    if (!appointments.length) return res.status(404).send('No appointments found');
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all appointments for a doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId }).populate('patientId');
    if (!appointments.length) return res.status(404).send('No appointments found');
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!appointment) return res.status(404).send('Appointment not found');

    // Notify patient about status update
    const patient = await userModel.findById(appointment.patientId);
    if (patient) {
      await sendNotification(patient.email, 'Appointment Status Update', `Your appointment status has been updated to ${status}`);
    }

    res.send(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
