"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Ingredient, User } from "../types";
import { usePathname, useRouter } from "next/navigation";
import getUserInfo from "../api/auth/getUserInfo";
import { set } from "mongoose";
import getIngredients from "../api/ingredients/getIngredients";

interface ContextType {
  loading: boolean;
  user: User | null;
  ingredients: Ingredient[];
  getIngredients: () => void;
}

const UserContext = createContext<ContextType>({} as ContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [ingredients, setIngredients] = useState([] as Ingredient[]);

  const pathname = usePathname();
  const router = useRouter();

  const getIngereientsFct = async () => {
    let ingredients = await getIngredients();
    if (!ingredients) {
      return;
    }
    setIngredients(JSON.parse(ingredients));
  };

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
    getIngereientsFct();
  }, []);

  return (
    <UserContext.Provider
      value={{ loading, user, ingredients, getIngredients: getIngereientsFct }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
