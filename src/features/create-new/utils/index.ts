import { z } from "zod";

export const designRoomSchema = z.object({
  roomType: z.string().min(1, "Room type is required"), // Validation for room type
  designType: z.string().min(1, "Design type is required"), // Validation for room type
  prompt: z.string().trim().min(5, "Message should be at least 5 characters"),
});
