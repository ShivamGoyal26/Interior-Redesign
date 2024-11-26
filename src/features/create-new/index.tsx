"use client";

import { useReducer } from "react";

// files
import ImageSelection from "./_components/image-selection";
import RoomForm from "./_components/room-form";

// Define the state type
type State = {
  file: File | undefined;
};

// Define the action types
type Action = { type: "SET_FILE"; payload: File };

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, file: action.payload };
    default:
      return state;
  }
};

const CreateNew = () => {
  const [state, dispatch] = useReducer(reducer, {
    file: undefined,
  });

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      dispatch({ type: "SET_FILE", payload: files[0] });
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

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image Selection */}
        <ImageSelection file={state.file} onFileSelected={onFileSelected} />
        {/* Form Input Selection */}
        <div>
          {/* Room Type */}
          <RoomForm />
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
