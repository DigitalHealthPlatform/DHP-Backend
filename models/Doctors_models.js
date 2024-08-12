import { Schema, model } from "mongoose";

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: false
  },
  contactDetails: {
    phone: String,
    email: String
  },
});

  
  const DoctorModel = model('Doctor', doctorSchema);
  export default DoctorModel;