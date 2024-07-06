"use client";

import { useUser } from "@/app/hooks/UserContext";
import { useState } from "react";

interface Props {
  close: () => void;
  edit?: boolean;
  id?: string;
}

export default function AddIngredientModal(props: Props) {
  const user = useUser();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const onCLose = () => {
    setName("");
    setPrice(0);

    props.close();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || price === 0) {
      return;
    }

    if (!props.edit) {
      await user.addIngredient(name, price);
    } else {
      await user.editIngredient(props.id!, name, price);
    }

    onCLose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg w-1/2">
        {!props.edit ? (
          <h2 className="text-2xl font-bold">Adauga Ingredient</h2>
        ) : (
          <h2 className="text-2xl font-bold">Editeaza Ingredient</h2>
        )}
        <form className="mt-5" onSubmit={onSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nume
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-3 border-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Pret
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="mt-1 p-3 border-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            {!props.edit ? (
              <button
                type="submit"
                className="px-4 py-2 text-lg bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-lg bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Edit
              </button>
            )}
            <button
              className="px-4 py-2 text-lg bg-red-600 text-white rounded-md hover:bg-red-700 ml-3"
              onClick={() => onCLose()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
