import mongoose, { Document, Schema } from "mongoose";

interface IUpazila extends Document {
  id: string;
  district_id: string;
  rdx_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

const upazilaSchema = new Schema<IUpazila>(
  {
    id: { type: String, required: true, unique: true },
    district_id: { type: String, required: true },
    rdx_id: { type: String, required: true },
    name: { type: String, required: true },
    bn_name: { type: String, required: true },
    url: { type: String },
  },
  { _id: false }
);

const Upazila = mongoose.model<IUpazila>("Upazila", upazilaSchema);

export default Upazila;
