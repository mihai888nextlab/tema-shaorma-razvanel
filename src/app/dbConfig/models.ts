import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
});

const userModel =
  models.temarazvan_users || model("temarazvan_users", userSchema);

export { userModel };
