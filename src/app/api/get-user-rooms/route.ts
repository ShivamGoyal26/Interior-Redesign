import { db } from "@/db";
import { imagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail) {
      return NextResponse.json(
        { isSuccess: false, data: null, message: "please provide an email" },
        { status: 400 }
      );
    }

    const dbResult = await db
      .select()
      .from(imagesTable)
      .where(eq(imagesTable.userEmail, userEmail));

    if (!dbResult.length) {
      return NextResponse.json({ isSuccess: true, data: [] }, { status: 200 });
    }

    return NextResponse.json(
      { isSuccess: true, data: dbResult },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { isSuccess: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
