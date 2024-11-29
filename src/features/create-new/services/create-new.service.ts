import { axiosInstance } from "@/api";

const endpoints = {
  uploadImage: "/s3-upload",
  redesignRoom: "/redesign-room",
};

export type UploadImageResponse = {
  isSuccess: boolean;
  message: string;
  error?: string;
  data?: string;
};

export type RedesignRoomResponse = {
  isSuccess: boolean;
  message: string;
  error?: string;
  data?: {
    originalImage: string;
    aiGeneratedImage: string;
  };
};

type RedesignRoomPayload = {
  originalImage: string;
  userEmail: string;
  credits: number;
  prompt: string;
  roomType: string;
  designType: string;
};

export const uploadImage = async (
  payload: FormData
): Promise<UploadImageResponse> => {
  return await axiosInstance.post(endpoints.uploadImage, payload);
};

export const redesignRoom = async (
  payload: RedesignRoomPayload
): Promise<RedesignRoomResponse> => {
  return await axiosInstance.post(endpoints.redesignRoom, payload);
};
