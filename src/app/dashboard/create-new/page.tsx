import CreateNew from "@/features/create-new";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Room Redesign",
  description: "Redesign of the create new room feature.",
};

const CreateNewPageRoute = () => {
  return <CreateNew />;
};

export default CreateNewPageRoute;
