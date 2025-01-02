import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String, // Specify type using `type`
    required: true, // Mark field as required
    unique: true, // Ensure uniqueness
  },
  name: {
    type: String, // Specify type using `type`
    required: true, // Mark field as required
  },
  email: {
    type: String, // Specify type using `type`
    required: true, // Mark field as required
  },
  username: {
    type: String, // Specify type using `type`
    required: true, // Mark field as required
  },
  photo: {
    type: String, // Optional field
  },
  firstName: {
    type: String, // Optional field
  },
  lastName: {
    type: String, // Optional field
  },
});

// Check if the model already exists before creating it
const User = models?.User || model("User", userSchema);

export default User;
