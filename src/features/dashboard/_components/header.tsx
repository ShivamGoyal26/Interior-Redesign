"use client";

import { Button } from "@/components/ui/button";
import { userDetailContext } from "@/contexts/userDetailContext";
import { UserDetailContextType } from "@/types/userDetail";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useContext } from "react";

const Header = () => {
  const { userDetail } = useContext<UserDetailContextType | undefined>(
    userDetailContext
  ) || { userDetail: { credits: 0 } };

  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h1 className="text-lg font-bold">AI Room Design</h1>
      </div>

      <Button variant={"ghost"} className="rounded-full text-primary">
        Buy More Credits
      </Button>

      <div className="flex items-center gap-7">
        <div className="flex items-center gap-2 p-1 bg-slate-100 px-3 rounded-full">
          <Image src={"/star.png"} alt="star" width={20} height={20} />
          <h2>{userDetail?.credits}</h2>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
