import mongoose, { Document, Schema } from "mongoose";

interface IUnion extends Document {
  id: string;
  upazilla_id: string;
  rdx_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

const unionSchema = new Schema<IUnion>(
  {
    id: { type: String, required: true, unique: true },
    upazilla_id: { type: String, required: true },
    rdx_id: { type: String, required: true },
    name: { type: String, required: true },
    bn_name: { type: String, required: true },
    url: { type: String },
  },
  { _id: false }
);

const Union = mongoose.model<IUnion>("Union", unionSchema);

export default Union;
