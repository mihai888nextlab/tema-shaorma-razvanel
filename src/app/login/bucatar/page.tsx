"use client";

import loginBucatar from "@/app/api/auth/loginBucatar";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginBucatar() {
  const router = useRouter();

  const [inp, setInp] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginBucatar(inp);
    setError(res ? res : "");

    if (!res) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={onSubmit}
        className="w-1/2 h-1/2 shadow-xl rounded-lg p-5 flex flex-col justify-between items-center bg-white"
      >
        <h1 className="text-center font-semibold">Buna, bucatar!</h1>
        <input
          type="text"
          placeholder="Introdu codul de acces"
          className="h-14 p-5 rounded-lg border border-gray-300 w-1/2"
          value={inp}
          required
          onChange={(e) => setInp(e.target.value)}
        />
        <div className="w-full flex flex-col justify-center items-center">
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/2 h-14 mt-5"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
