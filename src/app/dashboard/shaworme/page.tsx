"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardSidebar from "@/app/components/DashboardSIdebar";
import Loading from "@/app/components/Loading";
import AddShawormaModal from "@/app/components/modals/AddShawormaModal";
import { useUser } from "@/app/hooks/UserContext";
import { useState } from "react";

export default function Dashboard() {
  const user = useUser();

  const [addShaorma, setAddShaorma] = useState(false);

  let price = 0;

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
              onClick={() => setAddShaorma(true)}
            >
              Adauga shaworma de vanzare
            </button>
            {addShaorma && (
              <AddShawormaModal close={() => setAddShaorma(false)} />
            )}
          </div>

          <div className="mt-10">
            <table className="w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="p-3 border-2 border-r-gray-400">Nume</th>
                  <th className="p-3 border-2 border-r-gray-400">
                    Ingrediente
                  </th>
                  <th className="p-3 border-2 border-r-gray-400">
                    Pret productie
                  </th>
                  <th className="p-3 border-2 border-r-gray-400">
                    Pret vanzare
                  </th>
                  <th className="p-3">Actiuni</th>
                </tr>
              </thead>
              <tbody>
                {!user.shawormas.length && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Nu exista shaworme
                    </td>
                  </tr>
                )}
                {user.shawormas.map((sha, index) => (
                  <tr
                    className="bg-gray-100 hover:bg-gray-200 border-b-2"
                    key={index}
                  >
                    <td className="text-center p-2">{sha.name}</td>
                    <td className="text-center p-2">
                      {sha.ingredients.map((shaIng, index) => {
                        let ing = user.ingredients.find(
                          (ing) => ing._id === shaIng
                        );
                        return ing?.name + ", ";
                      })}
                    </td>
                    <td className="text-center p-2">
                      {sha.ingredients.map((shaIng, index) => {
                        let ing = user.ingredients.find(
                          (ing) => ing._id === shaIng
                        );

                        price += ing?.price || 0;

                        return price + " ";
                      })}
                    </td>
                    <td className="text-center p-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-md"
                        // onClick={() => setEditIngredient(ing)}
                      >
                        Editeaza
                      </button>
                      {/* {editIngredient && (
                        <AddIngredientModal
                          close={() => setEditIngredient(null)}
                          edit
                          id={editIngredient._id}
                          name={editIngredient.name}
                          price={editIngredient.price}
                        />
                      )} */}
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded-md ml-2"
                        onClick={() => user.deleteIngredient(sha._id)}
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
