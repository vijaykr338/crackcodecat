import mongoose, { Schema, Document, models } from "mongoose";

interface IDemoStudent extends Document {
  name: string;
  email: string;
  mobile: string;
  createdAt: Date;
}

const DemoStudentSchema = new Schema<IDemoStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  { timestamps: true }
);

export default models.DemoStudent || mongoose.model<IDemoStudent>("DemoStudent", DemoStudentSchema);
