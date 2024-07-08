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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShawarmas, setFilteredShawarmas] = useState<
    { _id: string; name: string; ingredients: string[]; price: number }[]
  >([]);

  const calculateShawarmaPrice = (
    shawarma: Shaworma,
    ingredients: Ingredient[]
  ) => {
    return shawarma.ingredients.reduce((total, ingredientId) => {
      const ingredient = ingredients.find((i) => i._id === ingredientId);
      return total + (ingredient ? ingredient.price : 0);
    }, 0);
  };

  const handleSearch = () => {
    const query = prompt("Enter shawarma name to search:");
    if (query !== null) {
      setSearchQuery(query.toLowerCase());
    }
  };

  useEffect(() => {
    if (user.ingredients.length === 0) return;

    const shawarmasWithPrices = user.shawormas.map((shawarma) => ({
      ...shawarma,
      ingredients: shawarma.ingredients.map((shaIng) => {
        return user.ingredients.find((ing) => ing._id === shaIng)?.name || "";
      }),
      price: calculateShawarmaPrice(shawarma, user.ingredients),
    }));

    console.log(shawarmasWithPrices);

    const averegePrice = user.shawormas.reduce((total, shaworma) => {
      return total + calculateShawarmaPrice(shaworma, user.ingredients);
    }, 0);
    setAveregePrice(averegePrice / user.shawormas.length);

    const filteredShawarmas = shawarmasWithPrices.filter((shawarma) => {
      const price = parseFloat(searchQuery);

      const matchesName = shawarma.name.toLowerCase().includes(searchQuery);
      const matchesIngredient = shawarma.ingredients.some(
        (ingredient) => ingredient.toLowerCase() === searchQuery
      );
      const matchesPrice = !isNaN(price) && shawarma.price <= price;

      return matchesName || matchesIngredient || matchesPrice;
    });

    filteredShawarmas.sort((a, b) => {
      return (
        calculateShawarmaPrice(a, user.ingredients) -
        calculateShawarmaPrice(b, user.ingredients)
      );
    });

    console.log("fill", filteredShawarmas);

    setFilteredShawarmas(filteredShawarmas);
  }, [user.ingredients, user.shawormas, searchQuery]);

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
              onClick={() => handleSearch()}
            >
              Cauta shaworma
            </button>
          </div>
          <div className="mt-10">
            <h1 className="font-semibold text-3xl text-gray-500">
              Shaworme deluxe
            </h1>
            <ul>
              {filteredShawarmas.map((shaworma, index) => (
                <div key={index}>
                  {shaworma.price > averegePrice && (
                    <li className="w-1/2 mb-5">
                      <div className="w-full flex justify-between text-2xl">
                        <span>{shaworma.name.toUpperCase()}</span>
                        <span className="font-bold">
                          {shaworma.price * 1.2} lei
                        </span>
                      </div>
                      <div className="font-bold text-lg">
                        INGREDIENTE:{" "}
                        {shaworma.ingredients.map((ing) => (
                          <span key={ing + index}>{ing}, </span>
                        ))}
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
              {filteredShawarmas.map((shaworma, index) => (
                <div key={index}>
                  {shaworma.price < averegePrice && (
                    <li className="w-1/2 mb-5">
                      <div className="w-full flex justify-between text-2xl">
                        <span>{shaworma.name.toLowerCase()}</span>
                        <span className="font-bold">
                          {shaworma.price * 1.2} lei
                        </span>
                      </div>
                      <div className="font-bold text-lg">
                        INGREDIENTE:{" "}
                        {shaworma.ingredients.map((ing, index) => (
                          <span key={ing + index}>{ing}, </span>
                        ))}
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
