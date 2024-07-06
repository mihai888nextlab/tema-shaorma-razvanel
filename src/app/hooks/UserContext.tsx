"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Ingredient, User } from "../types";
import { usePathname, useRouter } from "next/navigation";
import getUserInfo from "../api/auth/getUserInfo";
import { set } from "mongoose";
import getIngredients from "../api/ingredients/getIngredients";
import addIngredient from "../api/ingredients/addIngredient";
import deleteIngredient from "../api/ingredients/deleteIngredient";
import editIngredient from "../api/ingredients/editIngredient";

interface ContextType {
  loading: boolean;
  user: User | null;
  ingredients: Ingredient[];
  getIngredients: () => void;
  addIngredient: (name: string, price: number) => Promise<void>;
  deleteIngredient: (id: string) => Promise<void>;
  editIngredient: (id: string, name: string, price: number) => Promise<void>;
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

  const addIngredientFct = async (name: string, price: number) => {
    setLoading(true);
    await addIngredient(name, price);
    await getIngereientsFct();
    setLoading(false);
  };

  const deleteIngredientFct = async (id: string) => {
    setLoading(true);
    await deleteIngredient(id);
    await getIngereientsFct();
    setLoading(false);
  };

  const editIngredientFct = async (id: string, name: string, price: number) => {
    setLoading(true);
    await editIngredient(id, name, price);
    await getIngereientsFct();
    setLoading(false);
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
      value={{
        loading,
        user,
        ingredients,
        getIngredients: getIngereientsFct,
        addIngredient: addIngredientFct,
        deleteIngredient: deleteIngredientFct,
        editIngredient: editIngredientFct,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
