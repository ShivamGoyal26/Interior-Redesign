import ImageSelection from "./_components/ImageSelection";

const CreateNew = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Transform any room with a click. Select a space, choose a style, watch
        as AI instantly reimagines your enviornment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
        {/* Image Selection */}
        <ImageSelection />
        {/* Form Input Selection */}
      </div>
    </div>
  );
};

export default CreateNew;
