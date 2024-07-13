import mongoose, { Document, Schema } from "mongoose";

interface IDistrict extends Document {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat?: string;
  lon?: string;
  url?: string;
}

const districtSchema = new Schema<IDistrict>(
  {
    id: { type: String, required: true, unique: true },
    division_id: { type: String, required: true },
    name: { type: String, required: true },
    bn_name: { type: String, required: true },
    lat: { type: String },
    lon: { type: String },
    url: { type: String },
  },
  {
    _id: false,
  }
);

const District = mongoose.model<IDistrict>("District", districtSchema);

export default District;
