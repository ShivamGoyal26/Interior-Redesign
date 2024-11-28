import { cn } from "@/lib/utils";
import Image from "next/image";

const roomTypes = [
  {
    type: "Modern",
    image: "/livingroom.jpg", // Replace with an actual image URL
  },
  {
    type: "Industrial",
    image: "/bedroom.jpg",
  },
  {
    type: "Bohemian",
    image: "/kitchen.jpg",
  },
  {
    type: "Traditional",
    image: "/bathroom.jpg",
  },
  {
    type: "Rustic",
    image: "/dinningroom.jpg",
  },
  {
    type: "Minimalist",
    image: "/dinningroom.jpg",
  },
];

type DesignTypeProps = {
  value: string;
  onDesignTypeChange: (value: string) => void;
  error?: string;
  loading: boolean;
};

const DesignType = ({
  value,
  error,
  onDesignTypeChange,
  loading,
}: DesignTypeProps) => {
  return (
    <div className="space-y-2">
      <label className="text-slate-500 mb-2 text-sm font-normal">
        Select Interior Design Type{" "}
        <span className="text-destructive font-bold">*</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {roomTypes.map((item) => {
          return (
            <div
              onClick={() => !loading && onDesignTypeChange(item.type)}
              key={item.type}
            >
              <Image
                className={cn(
                  "h-[70px] rounded-md hover:scale-105 transition-all cursor-pointer",
                  value === item.type && "border-2 border-purple-600",
                  loading && "cursor-not-allowed"
                )}
                src={item.image}
                width={100}
                height={100}
                alt="image"
              />
              <h2 className="text-sm mt-2">{item.type}</h2>
            </div>
          );
        })}
      </div>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  );
};

export default DesignType;
