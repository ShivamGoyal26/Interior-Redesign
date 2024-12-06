"use client";

import { useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Files
import { userDetailContext } from "./contexts/userDetailContext";
import { UserDetailContextType } from "./types/userDetail";
import useVerifyUser from "./hooks/useVerifyUser";
import { verifyUser } from "./services/verify-user";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<
    null | UserDetailContextType["userDetail"]
  >(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await verifyUser({ user });
      setUserDetail(response.result);
    } catch (error) {
      console.log("error from the server", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchUser();
  }, [user, fetchUser]);

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
