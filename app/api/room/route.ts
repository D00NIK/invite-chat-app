import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const room = await prisma.room.create({ data: { id: undefined } });

  return NextResponse.json(room);
}
