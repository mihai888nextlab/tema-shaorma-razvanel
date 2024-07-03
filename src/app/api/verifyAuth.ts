"use server";

import speakeasy from "speakeasy";

export default async function verifyAuth(token: string, secret: string) {
  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });

  return verified;
}
