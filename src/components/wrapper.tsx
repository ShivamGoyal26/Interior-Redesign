"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

type WrapperProps = {
  isLoading: boolean;
  error: string;
  children: React.ReactElement;
  refetch: () => void;
};

const Wrapper = ({ isLoading, error, children, refetch }: WrapperProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-24">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-24">
        <p className="text-destructive text-lg">
          {error ?? "something went wrong please try again!"}
        </p>
        <Button
          className="mt-4"
          onClick={() => refetch()} // Optionally allow users to retry
        >
          Retry
        </Button>
      </div>
    );
  }

  return children;
};

export default Wrapper;
