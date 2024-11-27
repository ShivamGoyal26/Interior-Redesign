import { integer, pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  imageUrl: varchar("image_url").notNull(),
  credits: integer("credits").default(3),
});

export const imagesTable = pgTable("imagesTable", {
  id: serial("id").primaryKey(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  originalImage: varchar("originalImage").notNull(),
  aiGeneratedImage: varchar("aiGeneratedImage").notNull(),
  prompt: varchar("prompt").notNull(),
  userEmail: varchar("userEmail").notNull(),
});
