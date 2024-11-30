"use client";

import Link from "next/link";
import { useMemo } from "react";

// Files
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import EmptyData from "./empty-data";
import RoomLisiting from "./room-listing";
import Wrapper from "@/components/wrapper";
import useGetRooms from "../hooks/useGetRooms";

const Listings = () => {
  const { user } = useUser();

  const email = useMemo(
    () => user?.primaryEmailAddress?.emailAddress,
    [user?.primaryEmailAddress?.emailAddress]
  );

  const { data, error, isLoading, refetch, isRefetching } = useGetRooms({
    isEnabled: !!email,
    userEmail: email ?? "",
  });

  return (
    <Wrapper
      refetch={refetch}
      isLoading={isLoading || isRefetching}
      error={error?.message}
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Hello, {user?.fullName}</h2>
          <Link href="/dashboard/create-new" aria-label="Redesign your room">
            <Button>+ Redesign Room</Button>
          </Link>
        </div>

        <div className="mt-24 items-center flex flex-col">
          {data && Array.isArray(data.data) && data.data.length > 0 ? (
            <RoomLisiting data={data.data} />
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Listings;
