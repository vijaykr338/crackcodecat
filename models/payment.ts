import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  courseId: mongoose.Types.ObjectId;   // course purchased
  userId: mongoose.Types.ObjectId; // user making payment
  amount: number;
  currency: string;
  instamojoRequestId?: string; // payment_request id from Instamojo
  instamojoPaymentId?: string; // actual payment id (once successful)
  status: "Pending" | "Sucess" | "Failed";
  createdAt: Date;
  updatedAt: Date;
  couponUsed : String;
}

const PaymentSchema = new Schema<IPayment>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    instamojoRequestId: {
      type: String,
    },
    instamojoPaymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    couponUsed: {
    type: String,
    default: null, // It will be null if no coupon was used
  }
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
