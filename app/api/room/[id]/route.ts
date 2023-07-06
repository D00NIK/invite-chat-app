import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  const room = await prisma.room.findUnique({ where: { id: params.id } });

  return NextResponse.json(room);
}
