import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="py-4 flex justify-between items-center  px-4 sm:px-8 bg-slate-100  border-gray-300 border-b-1  shadow-lg ">
      <Link href={"/"} className="text-[black] text-[18px] ">
        <Image
          src="/icons8-assignment-48.png"
          alt="logo"
          width={60}
          height={60}
          className=""
        />
      </Link>
      <div className="flex items-center gap-4 sm:gap-10">
        <Link
          href={"/"}
          className="text-[black] font-semibold hover:text-[#6D6DBB] focus:text-[#6D6DBB] text-[18px] "
        >
          Home
        </Link>
        <Link
          href={"/add-task"}
          className="text-[black] font-semibold  hover:text-[#6D6DBB] focus:text-[#6D6DBB] text-[18px] "
        >
          Add Notes
        </Link>
      </div>
    </div>
  );
};

export default Header;
