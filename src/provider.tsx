"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import { userDetailContext } from "./contexts/userDetailContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<null | unknown>(null);

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
    <userDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </userDetailContext.Provider>
  );
};

export default Provider;
