import { Ingredient } from "../types";

export default function MultiSelectDropdown({
  formFieldName,
  options,
}: {
  formFieldName: string;
  options: Ingredient[];
}) {
  return (
    <>
      <label className="relative">
        <div className="bg-white border transition-opacity">
          <ul>
            {options.map((option, i) => {
              return (
                <li key={i}>
                  <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                    <input
                      type="checkbox"
                      name={formFieldName}
                      value={option._id}
                      className="cursor-pointer"
                    />
                    <span className="ml-1">
                      {option.name}
                      {" - "}
                      <span className="font-bold">{option.price} RON</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </label>
    </>
  );
}
