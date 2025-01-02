import { model, models } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    String,
    required: true,
    unique: true,
  },
  name: {
    String,
    required: true,
  },
  email: {
    String,
    required: true,
  },
  username: {
    String,
    required: true,
  },
  photo: String,
  firstName: String,
  lastName: String,
});

const User = models?.User || model("User", userSchema);

export default User;