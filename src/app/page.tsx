import bg from "./assets/bg.png";

export default function Home() {
  return (
    <div className=" grid grid-cols-2 grid-rows-1">
      <div
        className="h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('" + bg.src + "')" }}
      ></div>
      <div className="h-screen p-5 flex flex-col justify-between">
        <h1 className="text-center font-semibold">
          Intra pe aplicatie ca si client sau ca si bucatar
        </h1>
        <div className="flex flex-col items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 h-14 mb-5">
            Intra ca si client
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/2 h-14 mt-5">
            Intra ca si bucatar
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
