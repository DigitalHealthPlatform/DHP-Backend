import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['patient', 'admin']
    },
    contactDetails: { type: String },
    termsAndCondition: { type: Boolean }
}, {
    timestamps: true
});

userSchema.plugin(toJSON);

export const userModel = model("User", userSchema);
export default userModel;