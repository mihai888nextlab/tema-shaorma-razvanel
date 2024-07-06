"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardSidebar from "@/app/components/DashboardSIdebar";
import Loading from "@/app/components/Loading";
import AddIngredientModal from "@/app/components/modals/AddIngredientModal";
import { useUser } from "@/app/hooks/UserContext";
import { useState } from "react";

export default function Dashboard() {
  const user = useUser();

  const [addIngredient, setAddIngredient] = useState(false);
  const [editIngredientId, setEditIngredientId] = useState("");

  if (user.loading) {
    return <Loading />;
  }

  return (
    <>
      <DashboardHeader />
      <main className="mt-10 px-20 grid grid-cols-[1fr_3fr]">
        <DashboardSidebar />
        <section className="py-3 px-10">
          <div className="flex justify-end">
            <button
              className="px-5 py-3 rounded-xl text-white font-semibold bg-blue-500 text-xl"
              onClick={() => setAddIngredient(true)}
            >
              Adauga ingredient
            </button>
            {addIngredient && (
              <AddIngredientModal close={() => setAddIngredient(false)} />
            )}
          </div>

          <div className="mt-10">
            <table className="w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="p-3 border-2 border-r-gray-400">Nume</th>
                  <th className="p-3 border-2 border-r-gray-400">Pret</th>
                  <th className="p-3">Actiuni</th>
                </tr>
              </thead>
              <tbody>
                {!user.ingredients.length && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Nu exista ingrediente
                    </td>
                  </tr>
                )}
                {user.ingredients.map((ing, index) => (
                  <tr
                    className="bg-gray-100 hover:bg-gray-200 border-b-2"
                    key={index}
                  >
                    <td className="text-center p-2">{ing.name}</td>
                    <td className="text-center p-2">{ing.price}</td>
                    <td className="text-center p-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-md"
                        onClick={() => setEditIngredientId(ing._id)}
                      >
                        Editeaza
                      </button>
                      {editIngredientId && (
                        <AddIngredientModal
                          close={() => setEditIngredientId("")}
                          edit
                          id={editIngredientId}
                        />
                      )}
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded-md ml-2"
                        onClick={() => user.deleteIngredient(ing._id)}
                      >
                        Sterge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
