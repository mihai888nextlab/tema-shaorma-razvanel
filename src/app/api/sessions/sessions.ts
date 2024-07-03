"use server";

import { cookies } from "next/headers";

export async function getSession() {
  return cookies().get("sessionData")?.value;
}

export async function setSession(text: string) {
  cookies().set("sessionData", text, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}

export async function removeSession() {
  cookies().set("sessionData", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
}
