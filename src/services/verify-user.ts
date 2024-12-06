import { axiosInstance } from "@/api";

const endpoints = {
  verifyUser: "/verify-user",
};

export type VerifyUserPayload = {
  user?: unknown;
};

export type VerifyUserResponse = {
  result: {
    id: number;
    name: string;
    email: string;
    image_url: string;
    credits: number;
  };
  status: string;
};

export const verifyUser = async (
  payload: VerifyUserPayload
): Promise<VerifyUserResponse> => {
  return await axiosInstance.post(endpoints.verifyUser, payload);
};
