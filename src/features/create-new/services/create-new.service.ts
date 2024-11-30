import { axiosInstance } from "@/api";

const endpoints = {
  uploadImage: "/s3-upload",
  redesignRoom: "/redesign-room",
  getUserRooms: "/get-user-rooms",
};

export type UploadImageResponse = {
  isSuccess: boolean;
  message: string;
  error?: string;
  data?: string;
};

export type UserRoom = {
  id: number;
  roomType: string;
  designType: string;
  originalImage: string;
  aiGeneratedImage: string;
  prompt: string;
  userEmail: string;
};

export type UserRoomsResponse = {
  isSuccess: boolean;
  message: string;
  error?: string;
  data?: UserRoom[];
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

export const getUserRooms = async (payload: {
  userEmail: string;
}): Promise<UserRoomsResponse> => {
  return await axiosInstance.post(endpoints.getUserRooms, payload);
};
