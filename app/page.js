import GradeForm from "@/components/GradeComponentForm";

export default function Home() {
  return (
    <>
      <main className=" flex flex-col min-h-screen text-slate-700 bg-gray-50 py-12">
        <GradeForm />
      </main>
      <div className="items-center justify-center font-bold bg-black text-lg py-1 text-slate-200 mt-10">
        developed by Amrendra
      </div>
    </>
  );
}
