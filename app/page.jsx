import GradeForm from "@/components/GradeComponentForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <section className="h-full">
        <div className="container mx-auto text-3xl items-center justify-center flex flex-col h-[620px] mb-32">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome! calculate your SGPA, 1st semester
          </h1>
          <h2 className="text-2xl p-3 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            with <span className="text-5xl">ease</span> and <span className="text-5xl">accuracy</span>.
          </h2>
        </div>
      </section>

      <footer className="">
        <div className="container mx-auto text-center py-8">
          <p className="text-gray-400">
            Made with ❤️ by Amrendra
          </p>
        </div>
      </footer>
    </div>
  );
}