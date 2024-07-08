"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { shawormaModel } from "@/app/dbConfig/models";

connectDB();

export default async function editIngredient(
  id: string,
  name: string,
  ingredients: string[]
) {
  try {
    await shawormaModel.findByIdAndUpdate(id, { name, ingredients });
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
