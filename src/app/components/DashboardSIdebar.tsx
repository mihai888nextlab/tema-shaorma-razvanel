"use client";

import { useUser } from "../hooks/UserContext";

export default function DashboardSidebar() {
  const user = useUser();

  return (
    <aside className="border-2 rounded-xl p-3 pt-0">
      {user.user?.type === "bucatar" && (
        <h1 className="text-lg font-semibold rounded-md text-center py-2 bg-red-500 text-white">
          Bucatar Mode
        </h1>
      )}
      {user.user?.type === "client" && (
        <h1 className="text-lg font-semibold rounded-md text-center py-2 bg-blue-500 text-white">
          Client Mode
        </h1>
      )}
      <nav>
        <ul>
          <li className="font-semibold rounded-xl p-2 cursor-pointer hover:bg-gray-100">
            <a href="/dashboard">Home</a>
          </li>
          <li className="font-semibold rounded-xl p-2 cursor-pointer hover:bg-gray-100">
            <a href="/dashboard/ingrediente">Ingrediente</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
