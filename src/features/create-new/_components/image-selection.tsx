"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

type ImageSelectionProps = {
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | undefined;
  loading: boolean;
};

const ImageSelection = ({
  onFileSelected,
  file,
  loading,
}: ImageSelectionProps) => {
  return (
    <div className="space-y-3">
      <label htmlFor="">Select Image of your room</label>
      <label
        htmlFor="upload-image"
        className={cn(
          "border rounded-xl border-dotted flex justify-center items-center bg-slate-200 border-primary p-28 cursor-pointer hover:shadow-lg shadow-sm",
          file && "p-0 bg-white",
          loading && "cursor-not-allowed"
        )}
      >
        <div className={cn("")}>
          {file ? (
            <Image
              alt="selected image"
              width={70}
              height={70}
              className="object-contain w-[300px] h-[300px]"
              src={URL.createObjectURL(file)}
            />
          ) : (
            <Image
              alt="image upload"
              src="/image-upload.png"
              width={70}
              height={70}
            />
          )}
        </div>
      </label>
      <input
        disabled={loading}
        onChange={onFileSelected}
        accept="image/*"
        type="file"
        id="upload-image"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageSelection;
