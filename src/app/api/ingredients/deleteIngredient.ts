"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { ingredientModel } from "@/app/dbConfig/models";

connectDB();

export default async function deleteIngredient(id: string) {
  try {
    await ingredientModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
