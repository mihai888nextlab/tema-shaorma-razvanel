"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { shawormaModel } from "@/app/dbConfig/models";

connectDB();

export default async function getShawormas() {
  try {
    let shawormas = await shawormaModel.find();

    return JSON.stringify(shawormas);
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
