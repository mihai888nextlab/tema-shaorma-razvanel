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

const shawormaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

const orderSchema = new Schema({
  client_name: {
    type: String,
    required: true,
  },
  delivery_address: {
    type: String,
    required: true,
  },
  items: {
    type: [Object],
    required: true,
  },
});

const userModel =
  models.temarazvan_users || model("temarazvan_users", userSchema);
const ingredientModel =
  models.temarazvan_ingredients ||
  model("temarazvan_ingredients", ingredientSchema);
const shawormaModel =
  models.temarazvan_shawormas || model("temarazvan_shawormas", shawormaSchema);
const orderModel =
  models.temarazvan_comenzi || model("temarazvan_comenzi", orderSchema);

export { userModel, ingredientModel, shawormaModel, orderModel };
