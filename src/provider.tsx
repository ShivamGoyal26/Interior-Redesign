"use client";

import { useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";

// Files
import { userDetailContext } from "./contexts/userDetailContext";
import { UserDetailContextType } from "./types/userDetail";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<null | UserDetailContextType>(
    null
  );

  const verifyUser = useCallback(async () => {
    try {
      const response = await axios.post("/api/verify-user", {
        user,
      });
      setUserDetail(response.data.result);
      console.log("response from the server", response);
    } catch (error) {
      console.log("error from the server", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) verifyUser();
  }, [user, verifyUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <userDetailContext.Provider value={{ userDetail, setUserDetail }}>
        {children}
      </userDetailContext.Provider>
    </QueryClientProvider>
  );
};

export default Provider;
