"use server";

import { redirect } from "next/navigation";
import { removeSession } from "../sessions/sessions";

export default async function logout() {
  await removeSession();
  redirect("/");
}
