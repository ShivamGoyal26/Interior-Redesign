"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import EmptyData from "./empty-data";
import Link from "next/link";

const Listings = () => {
  const { user } = useUser();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Hello, {user?.fullName}</h2>
        <Link href="/dashboard/create-new" aria-label="Redesign your room">
          <Button>+ Redesign Room</Button>
        </Link>
      </div>

      <div className="mt-24">
        <EmptyData />
      </div>
    </div>
  );
};

export default Listings;
