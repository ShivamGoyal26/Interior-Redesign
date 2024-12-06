"use client";

import { useCallback, useContext, useReducer, useState } from "react";

// Components
import ImageSelection from "./_components/image-selection";
import RoomForm from "./_components/room-form";
import OutputDialog from "./_components/output-dialog";

// Utilities
import { userDetailContext } from "@/contexts/userDetailContext";
import { redesignRoom, uploadImage } from "./services/create-new.service";
import useUpdateUserCredits from "../buy-credits/hooks/useUpdateUserCredits";

// Types
type State = {
  file?: File;
  loading: boolean;
  error: string;
};

type Action =
  | { type: "SET_STATE"; payload: Partial<State> }
  | { type: "RESET_ERROR" };

export type RegenerateImageProps = {
  prompt: string;
  roomType: string;
  designType: string;
};

// Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "RESET_ERROR":
      return { ...state, error: "" };
    default:
      return state;
  }
};

const initialState: State = {
  file: undefined,
  loading: false,
  error: "",
};

const CreateNew = () => {
  const { userDetail } = useContext(userDetailContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, setResult] = useState<null | {
    aiImage: string;
    originalImage: string;
  }>(null);
  const [open, setOpen] = useState(false);
  const { loading, updateCreditsInDB } = useUpdateUserCredits({
    redirect: false,
  });

  const onFileSelected = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        dispatch({ type: "SET_STATE", payload: { file } });
      }
    },
    []
  );

  const regenerateImage = useCallback(
    async (params: RegenerateImageProps) => {
      dispatch({ type: "RESET_ERROR" });

      if (!state.file) {
        return dispatch({
          type: "SET_STATE",
          payload: { error: "Please select a file" },
        });
      }

      const formData = new FormData();
      formData.append("file", state.file);

      try {
        dispatch({ type: "SET_STATE", payload: { loading: true } });

        // Upload image
        const uploadedImage = await uploadImage(formData);
        if (!uploadedImage.isSuccess) {
          throw new Error(uploadedImage.error || "File upload failed");
        }

        // Process image
        const response = await redesignRoom({
          ...params,
          originalImage: uploadedImage.data!,
          userEmail: userDetail.email!,
          credits: Number(userDetail.credits),
        });

        if (!response.isSuccess) {
          throw new Error(response.error || "Room redesign failed");
        }

        if (response.data) {
          updateCreditsInDB(userDetail.credits - 1);
          setResult({
            aiImage: response.data.aiGeneratedImage,
            originalImage: response.data.originalImage,
          });
        } else {
          throw new Error("Response data is undefined");
        }
        setOpen(true);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "An unknown error occurred";
        dispatch({ type: "SET_STATE", payload: { error: errorMessage } });
      } finally {
        dispatch({ type: "SET_STATE", payload: { loading: false } });
      }
    },
    [state.file, userDetail]
  );

  return (
    <div>
      <OutputDialog result={result} open={open} setOpen={setOpen} />
      <h2 className="font-bold text-2xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>

      {state.error && (
        <p className="text-destructive text-center mt-4">{state.error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <ImageSelection
          loading={state.loading}
          file={state.file}
          onFileSelected={onFileSelected}
        />
        <RoomForm loading={state.loading} regenerateImage={regenerateImage} />
      </div>
    </div>
  );
};

export default CreateNew;
