"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { ingredientModel } from "@/app/dbConfig/models";

connectDB();

export default async function addIngredient(name: string, price: number) {
  try {
    let ingredient = await ingredientModel.create({ name, price });

    await ingredient.save();
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
