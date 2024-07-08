"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardSidebar from "@/app/components/DashboardSIdebar";
import Loading from "@/app/components/Loading";
import { useUser } from "@/app/hooks/UserContext";
import { Ingredient, Shaworma } from "@/app/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const user = useUser();
  const [averegePrice, setAveregePrice] = useState(0);

  const calculateShawarmaPrice = (
    shawarma: Shaworma,
    ingredients: Ingredient[]
  ) => {
    return shawarma.ingredients.reduce((total, ingredientId) => {
      const ingredient = ingredients.find((i) => i._id === ingredientId);
      return total + (ingredient ? ingredient.price : 0);
    }, 0);
  };

  useEffect(() => {
    if (user.ingredients.length === 0) return;
    const averegePrice = user.shawormas.reduce((total, shaworma) => {
      return total + calculateShawarmaPrice(shaworma, user.ingredients);
    }, 0);
    setAveregePrice(averegePrice / user.shawormas.length);

    user.shawormas.sort((a, b) => {
      return (
        calculateShawarmaPrice(a, user.ingredients) -
        calculateShawarmaPrice(b, user.ingredients)
      );
    });
  }, [user.ingredients, user.shawormas]);

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
              onClick={() => prompt("Cauta shaworma")}
            >
              Cauta shaworma
            </button>
          </div>
          <div className="mt-10">
            <h1 className="font-semibold text-3xl text-gray-500">
              Shaworme deluxe
            </h1>
            <ul>
              {user.shawormas.map((shaworma, index) => (
                <div key={index}>
                  {calculateShawarmaPrice(shaworma, user.ingredients) >
                    averegePrice && (
                    <li className="w-1/2 mb-5">
                      <div className="w-full flex justify-between text-2xl">
                        <span>{shaworma.name.toUpperCase()}</span>
                        <span className="font-bold">
                          {calculateShawarmaPrice(shaworma, user.ingredients) *
                            1.2}{" "}
                          lei
                        </span>
                      </div>
                      <div className="font-bold text-lg">
                        INGREDIENTE:{" "}
                        {shaworma.ingredients.map((shaIng) => {
                          return (
                            user.ingredients.find((ing) => ing._id === shaIng)
                              ?.name + ", "
                          );
                        })}
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
            <h1 className="font-semibold text-3xl text-gray-500">
              Shaworme saraci
            </h1>
            <ul>
              {user.shawormas.map((shaworma, index) => (
                <div key={index}>
                  {calculateShawarmaPrice(shaworma, user.ingredients) <
                    averegePrice && (
                    <li className="w-1/2 mb-5">
                      <div className="w-full flex justify-between text-2xl">
                        <span>{shaworma.name.toLowerCase()}</span>
                        <span className="font-bold">
                          {calculateShawarmaPrice(shaworma, user.ingredients) *
                            1.2}{" "}
                          lei
                        </span>
                      </div>
                      <div className="font-bold text-lg">
                        INGREDIENTE:{" "}
                        {shaworma.ingredients.map((shaIng) => {
                          return (
                            user.ingredients.find((ing) => ing._id === shaIng)
                              ?.name + ", "
                          );
                        })}
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
