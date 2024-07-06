export default function DashboardHeader() {
  return (
    <header className="w-screen border-b-2 flex justify-between items-center px-20">
      <h1>
        <span className="text-red-500 font-semibold">Site</span>
        <span className="text-blue-500 font-bold">SHAWORMA</span>
      </h1>
      <button className="bg-red-500 text-white p-5 rounded-lg h-6 flex items-center justify-center hover:outline-none hover:ring-2 hover:ring-red-300">
        Logout
      </button>
    </header>
  );
}
