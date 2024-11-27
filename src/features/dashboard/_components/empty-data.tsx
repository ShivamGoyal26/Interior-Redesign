import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const EmptyData = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        className="rounded-lg shadow-lg mb-4"
        alt="Room preview"
        src="/bedroom.jpg"
        width={500}
        height={300}
      />
      <h2 className="font-medium text-lg text-gray-500 text-center">
        Create New AI Interior Design for your room
      </h2>
      <Link href="/dashboard/create-new" aria-label="Redesign your room">
        <Button className="mt-5">+ Redesign Room</Button>
      </Link>
    </div>
  );
};

export default EmptyData;
