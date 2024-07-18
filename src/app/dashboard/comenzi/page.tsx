"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardSidebar from "@/app/components/DashboardSIdebar";
import Loading from "@/app/components/Loading";
import { useUser } from "@/app/hooks/UserContext";

export default function Comenzi() {
  const user = useUser();

  if (user.loading) {
    return <Loading />;
  }

  return (
    <>
      <DashboardHeader />
      <main className="mt-10 px-20 grid grid-cols-[1fr_3fr]">
        <DashboardSidebar />
        <section className="py-3 px-10">
          <div>
            <h1 className="font-semibold">Comenzi</h1>
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
                        return ing ? ing.name + ", " : "";
                      })}
                    </td>

                    <td className="text-center p-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-md"
                        //     onClick={() => setEditShaworma(sha)}
                      >
                        Editeaza
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded-md ml-2"
                        //     onClick={() => user.deleteShaworma(sha._id)}
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
