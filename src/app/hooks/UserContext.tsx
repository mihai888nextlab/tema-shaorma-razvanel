"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { usePathname, useRouter } from "next/navigation";
import getUserInfo from "../api/auth/getUserInfo";
import { set } from "mongoose";

interface ContextType {
  loading: boolean;
  user: User | null;
}

const UserContext = createContext<ContextType>({} as ContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname.startsWith("/dashboard")) {
      return;
    }

    const fct = async () => {
      let data = await getUserInfo();
      if (!data) {
        router.push("/");
        return;
      }
      setUser(JSON.parse(data));
      setLoading(false);
    };

    fct();
  }, []);

  return (
    <UserContext.Provider value={{ loading, user }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
