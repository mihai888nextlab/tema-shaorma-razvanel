"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Ingredient, Shaworma, User } from "../types";
import { usePathname, useRouter } from "next/navigation";
import getUserInfo from "../api/auth/getUserInfo";
import { set } from "mongoose";
import getIngredients from "../api/ingredients/getIngredients";
import addIngredient from "../api/ingredients/addIngredient";
import deleteIngredient from "../api/ingredients/deleteIngredient";
import editIngredient from "../api/ingredients/editIngredient";
import addShaworma from "../api/shaworme/addShaworma";
import getShawormas from "../api/shaworme/getShaworma";
import deleteShaworma from "../api/shaworme/deleteShaworma";
import editShaworma from "../api/shaworme/editShaworma";

interface ContextType {
  loading: boolean;
  user: User | null;
  ingredients: Ingredient[];
  getIngredients: () => Promise<void>;
  addIngredient: (name: string, price: number) => Promise<void>;
  deleteIngredient: (id: string) => Promise<void>;
  editIngredient: (id: string, name: string, price: number) => Promise<void>;
  shawormas: Shaworma[];
  getShawormas: () => Promise<void>;
  addShaworma: (name: string, ingredients: string[]) => Promise<void>;
  deleteShaworma: (id: string) => Promise<void>;
  editShaworma: (
    id: string,
    name: string,
    ingredients: string[]
  ) => Promise<void>;
}

const UserContext = createContext<ContextType>({} as ContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [shawormas, setShawormas] = useState([] as Shaworma[]);

  const pathname = usePathname();
  const router = useRouter();

  // ----------- INGREDIENTS ------------

  const getIngereientsFct = async () => {
    let ingredients = await getIngredients();
    if (ingredients === null) return;
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

  // ----------- SHAWORMA ------------

  const getShawormasFct = async () => {
    let shawormas = await getShawormas();
    if (shawormas === null) return;
    setShawormas(JSON.parse(shawormas));
  };

  const addShawormaFct = async (name: string, ingredients: string[]) => {
    setLoading(true);
    await addShaworma(name, ingredients);
    await getShawormasFct();
    setLoading(false);
  };

  const deleteShawormaFct = async (id: string) => {
    setLoading(true);
    await deleteShaworma(id);
    await getShawormasFct();
    setLoading(false);
  };

  const editShawormaFct = async (
    id: string,
    name: string,
    ingredients: string[]
  ) => {
    setLoading(true);
    await editShaworma(id, name, ingredients);
    await getShawormasFct();
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
    getShawormasFct();
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
        shawormas,
        getShawormas: getShawormasFct,
        addShaworma: addShawormaFct,
        deleteShaworma: deleteShawormaFct,
        editShaworma: editShawormaFct,
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
