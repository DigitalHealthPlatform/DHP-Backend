import { Schema, model, Types } from "mongoose";

const healthRecordSchema = new Schema({
    userId: { type:Schema.Types.ObjectId, ref: 'User', required: true },
  records: { type: Array, required: true },
});
const HealthRecordModel = model('HealthRecord', healthRecordSchema);
export default HealthRecordModel;