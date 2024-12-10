import React from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

// Files
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useGetRooms from "@/features/dashboard/hooks/useGetRooms";
import { useUser } from "@clerk/nextjs";

type OutputDialogProps = {
  result: null | {
    aiImage: string;
    originalImage: string;
  };
  setOpen: (params: boolean) => void;
  open: boolean;
};

const OutputDialog = ({ result, open, setOpen }: OutputDialogProps) => {
  const router = useRouter();
  const { user } = useUser();

  const { resetQuery } = useGetRooms({
    isEnabled: true,
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Result</AlertDialogTitle>
          <ReactBeforeSliderComponent
            firstImage={{
              imageUrl: result ? result.aiImage! : "",
            }}
            secondImage={{
              imageUrl: result ? result.originalImage! : "",
            }}
          />
          <Button
            className="self-end"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                router.back();
                setTimeout(() => {
                  resetQuery();
                }, 200);
              }, 500);
            }}
          >
            Close
          </Button>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OutputDialog;
