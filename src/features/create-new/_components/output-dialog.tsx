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
              router.push("/dashboard");
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
