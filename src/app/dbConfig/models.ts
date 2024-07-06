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

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const userModel =
  models.temarazvan_users || model("temarazvan_users", userSchema);
const ingredientModel =
  models.temarazvan_ingredients ||
  model("temarazvan_ingredients", ingredientSchema);

export { userModel, ingredientModel };
