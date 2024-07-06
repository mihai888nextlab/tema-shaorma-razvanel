"use client";

interface Props {
  close: () => void;
}

export default function AddIngredientModal(props: Props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg w-1/2">
        <h2 className="text-2xl font-bold">Add Ingredient</h2>
        <form className="mt-5">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nume
            </label>
            <input
              type="text"
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
              className="mt-1 p-3 border-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-lg bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-lg bg-red-600 text-white rounded-md hover:bg-red-700 ml-3"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
