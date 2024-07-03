"use client";

import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { useEffect, useState } from "react";

export default function Page() {
  const [qr, setqr] = useState<any>(null);
  const generateQrCOde = async () => {
    const secret = speakeasy.generateSecret({ length: 20 });

    if (!secret.otpauth_url) return;
    console.log(secret.otpauth_url);
    try {
      const dataUrl = qrcode.toDataURL(secret.otpauth_url);

      setqr({
        qrCode: dataUrl,
        secret: secret.base32,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={() => generateQrCOde()}>Gen</button>
      <img src={qr?.qrCode} alt="" />
    </>
  );
}
