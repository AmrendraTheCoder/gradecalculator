"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between">
      <section>
        <div className="container mx-auto text-3xl items-center justify-center flex flex-col mt-[20vh] mb-2">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome! Predict your SGPA,
          </h1>
          <h2 className="text-2xl p-3 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            <span className="text-5xl">ease </span>&<span className="text-5xl"> accuracy</span>.
          </h2>
        </div>
      </section>
      <div className="flex justify-center gap-6 mt-6 mb-8">
        <button
          onClick={() => router.push("/crowdsgpa")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:from-blue-600 hover:to-purple-600 hover:scale-105 rounded-md font-medium"
        >
          Universal Predictor
        </button>
        <button
          onClick={() => router.push("/calculator")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:from-blue-600 hover:to-purple-600 hover:scale-105 rounded-md font-medium"
        >
          Predictor For LNMIITians
        </button>
      </div>
      <footer>
        <div className="container mx-auto text-center pb-8">
          <p className="text-gray-400">Made with ❤️ by Amrendra</p>
        </div>
      </footer>
    </div>
  );
}