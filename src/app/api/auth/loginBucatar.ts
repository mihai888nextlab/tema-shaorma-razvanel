"use server";

import connectDB from "@/app/dbConfig/connectDB";
import { userModel } from "@/app/dbConfig/models";
import verifyAuth from "../verifyAuth";
import { use } from "react";
import { redirect } from "next/navigation";
import { setSession } from "../sessions/sessions";
import jwt from "jsonwebtoken";

connectDB();

export default async function loginBucatar(token: string) {
  try {
    let users = await userModel.find({ type: "bucatar" });

    if (users.length === 0) {
      return "Utilizatorul nu a fost gasit!";
    }

    let verifiedUser: any = null;

    await Promise.all(
      users.map(async (user) => {
        let res = await verifyAuth(token, user.secret);
        //console.log(res);
        if (res) {
          verifiedUser = user;
        }
      })
    );

    if (!verifiedUser) {
      return "Codul de acces este gresit!";
    }

    const jwtToken = jwt.sign(
      { _id: verifiedUser._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    setSession(jwtToken);

    return;
  } catch (error) {
    console.error("Error: ", error);
    return "A aparut o eroare!";
  }
}
