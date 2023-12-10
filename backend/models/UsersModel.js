import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  userRole: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: false,
    min: 10,
    max: 15,
  },
  // merchant's additional info
  status:{
    type: String,
  },
  address: {
    type: String,
  },
  merchantDescription: {
    type: String,
  },
  document: {
    type: String,
  },
  filename: {
    type: String,
  },
  description: {
    type: String,
  },
  isMerchantChangedPassword: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Users", UserSchema);
