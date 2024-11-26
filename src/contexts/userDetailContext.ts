import { createContext } from "react";
import { UserDetailContextType } from "@/types/userDetail";

export const userDetailContext = createContext<
  UserDetailContextType | undefined
>(undefined);
