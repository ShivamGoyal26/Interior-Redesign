"use client";

import { useContext, useReducer } from "react";

// files
import ImageSelection from "./_components/image-selection";
import RoomForm from "./_components/room-form";
import axios from "axios";
import { UserDetailContextType } from "@/types/userDetail";
import { userDetailContext } from "@/contexts/userDetailContext";

// Define the state type
type State = {
  file: File | undefined;
  loading: boolean;
  error: string;
};

// Define the action types
type Action =
  | { type: "SET_FILE"; payload: File }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

export type RegenerateImageProps = {
  prompt: string;
  roomType: string;
  designType: string;
};

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const CreateNew = () => {
  const { userDetail } = useContext<UserDetailContextType | undefined>(
    userDetailContext
  ) || { userDetail: { credits: 0 } };

  const [state, dispatch] = useReducer(reducer, {
    file: undefined,
    loading: false,
    error: "",
  });

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      dispatch({ type: "SET_FILE", payload: files[0] });
    }
  };

  const regenerateImage = async (params: RegenerateImageProps) => {
    dispatch({ type: "SET_ERROR", payload: "" });

    if (!state.file) {
      return dispatch({ type: "SET_ERROR", payload: "please select file" });
    }
    const formData = new FormData();
    formData.append("file", state.file);
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const uploadedImage = await axios.post("/api/s3-upload", formData);
      if (uploadedImage.data.isSuccess) {
        const originalImage = uploadedImage.data.data;
        const response = await axios.post("/api/redesign-room", {
          ...params,
          originalImage,
          userEmail: userDetail.email,
          credits: userDetail.credits,
        });
        console.log(response);
      } else {
        dispatch({ type: "SET_ERROR", payload: uploadedImage.data.error });
      }
    } catch (error: any) {
      let errorMessage = error.response.data?.isSuccess
        ? error.response.data.error
        : error.message;
      dispatch({ type: "SET_ERROR", payload: errorMessage });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Transform any room with a click. Select a space, choose a style, watch
        as AI instantly reimagines your enviornment
      </p>

      {state.error && (
        <h1 className="text-destructive text-center mt-10">{state.error}</h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image Selection */}
        <ImageSelection
          loading={state.loading}
          file={state.file}
          onFileSelected={onFileSelected}
        />
        {/* Form Input Selection */}
        <div>
          {/* Room Type */}
          <RoomForm loading={state.loading} regenerateImage={regenerateImage} />
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
