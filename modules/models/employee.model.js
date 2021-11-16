import mongoose from "mongoose";

const schema = mongoose.Schema;
const employeeSchema = new schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
});

const employeeModel = mongoose.model("user", employeeSchema);
export { employeeModel };