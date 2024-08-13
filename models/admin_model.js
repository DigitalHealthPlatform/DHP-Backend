import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  // Hash the password before saving the admin
  adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Method to compare the password
  adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const AdminModel = model('Admin', adminSchema);
  export default AdminModel;