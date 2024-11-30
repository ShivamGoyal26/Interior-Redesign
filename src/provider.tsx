"use client";

import { useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Files
import { userDetailContext } from "./contexts/userDetailContext";
import { UserDetailContextType } from "./types/userDetail";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<
    null | UserDetailContextType["userDetail"]
  >(null);

  const verifyUser = useCallback(async () => {
    try {
      const response = await axios.post("/api/verify-user", {
        user,
      });
      setUserDetail(response.data.result);
    } catch (error) {
      console.log("error from the server", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) verifyUser();
  }, [user, verifyUser]);

  console.log(
    "process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID",
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
      >
        <userDetailContext.Provider
          value={{
            userDetail: userDetail || {
              credits: "",
              id: "",
              name: "",
              email: "",
              image_url: "",
            },
            setUserDetail,
          }}
        >
          {children}
        </userDetailContext.Provider>
      </PayPalScriptProvider>
    </QueryClientProvider>
  );
};

export default Provider;
