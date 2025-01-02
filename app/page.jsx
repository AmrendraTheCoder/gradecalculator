

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <section className="">
        <div className="container mx-auto text-3xl items-center justify-center flex flex-col mt-[20vh] mb-2">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome! predict your SGPA,
          </h1>
          <h2 className="text-2xl p-3 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            <span className="text-5xl">ease </span>&<span className="text-5xl"> accuracy</span>.
          </h2>
        </div>
      </section>

      <footer className="">
        <div className="container mx-auto text-center pb-8">
          <p className="text-gray-400">
            Made with ❤️ by Amrendra
          </p>
        </div>
      </footer>
    </div>
  );
}