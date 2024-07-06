"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { ingredientModel } from "@/app/dbConfig/models";

connectDB();

export default async function getIngredients() {
  try {
    let ingredients = await ingredientModel.find();

    if (ingredients.length === 0) {
      return null;
    }

    return JSON.stringify(ingredients);
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
