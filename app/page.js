import AllTask from "@/components/AllTask";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="bg-[#6D6DBB] px-4 sm:px-8 py-10 sm:flex items-center gap-8 min-h-[600px] w-full">
        <div className="">
          <h1 className="text-white font-bold text-5xl leading-[60px]">
            My Notes Assignment
          </h1>
          <p className="text-white text-[16px] py-6">
            I made this front-end and back-end app. I used in front-end Htm,
            Css, Javascript and it's framwork Next.js and in the back-end I used
            node.js mongodb etc.
          </p>
          <Link href="/add-task">
            <button className="py-3 px-10 bg-sky-400 rounded-md text-white">
              Add a Note
            </button>
          </Link>
        </div>

        <Image
          src="/note.png"
          alt="note"
          width={600}
          height={600}
          className=""
        />
      </div>
      {/* hero */}

      {/* shows task */}
      <AllTask />
      {/* about me */}
    </main>
  );
}
