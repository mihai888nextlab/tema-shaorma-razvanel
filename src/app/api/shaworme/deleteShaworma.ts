"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { shawormaModel } from "@/app/dbConfig/models";

connectDB();

export default async function deleteShaworma(id: string) {
  try {
    await shawormaModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
