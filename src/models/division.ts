import mongoose, { Document, Schema } from "mongoose";

interface IDivision extends Document {
  id: string;
  name: string;
  bn_name?: string;
  url?: string;
}

const divisionSchema = new Schema<IDivision>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bn_name: { type: String },
    url: { type: String },
  },
  {
    _id: false,
  }
);

const Division = mongoose.model<IDivision>("Division", divisionSchema);

export default Division;
