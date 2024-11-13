import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const result = await req.json();
  const { user } = result;

  try {
    const userExists = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress?.emailAddress));
    // create a new user in neon database
    if (!userExists.length) {
      const savedUser = await db
        .insert(usersTable)
        .values({
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          imageUrl: user.imageUrl,
        })
        .returning();
      return NextResponse.json({ result: savedUser[0], status: "success" });
    }
    // user already exists in the database
    return NextResponse.json({ result: userExists[0], status: "success" });
  } catch (error) {
    console.log("error from the server", error);
  }

  return NextResponse.json({ result: user, status: "error" });
}
