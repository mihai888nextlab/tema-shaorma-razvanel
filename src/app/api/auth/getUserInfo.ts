"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { getSession } from "../sessions/sessions";
import jwt from "jsonwebtoken";
import { userModel } from "@/app/dbConfig/models";

connectDB();

export default async function getUserInfo() {
  try {
    const session = await getSession();
    if (!session) return null;

    const userData = jwt.verify(session, process.env.JWT_SECRET!);

    if (!userData) return null;
    if (typeof userData == "string") return null;

    const user = await userModel.findById(userData._id);

    if (!user) return null;

    return JSON.stringify(user);
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
