"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { ingredientModel } from "@/app/dbConfig/models";

connectDB();

export default async function editIngredient(
  id: string,
  name: string,
  price: number
) {
  try {
    await ingredientModel.findByIdAndUpdate(id, { name, price });
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
