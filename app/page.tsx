import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-very-light-gray text-slate-950">
      <div className="flex gap-4">
        <div>
          <Image
            src="/images/Logo.svg"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-semibold">My Task Board</h1>
          <p className="text-xl">
            Tasks to keep organized
          </p>
        </div>
      </div>
    </main>
  );
}
