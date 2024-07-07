"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { shawormaModel } from "@/app/dbConfig/models";

connectDB();

export default async function addShaworma(name: string, ingredients: string[]) {
  try {
    let shaworma = new shawormaModel({ name, ingredients });

    await shaworma.save();
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
