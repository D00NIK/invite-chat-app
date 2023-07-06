import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  const room = await prisma.room.findUnique({ where: { id: params.id } });

  if (!room) return NextResponse.json("Room does not exist.", { status: 404 });

  return NextResponse.json(room);
}

export async function POST(req: Request, { params }: Props) {
  const room = await prisma.room.findUnique({ where: { id: params.id } });

  if (!room) return NextResponse.json("Room does not exist.", { status: 404 });

  const { msg }: { msg: string } = await req.json();

  if (msg.length > 500)
    return NextResponse.json("Max length of 500 exceeded", { status: 404 });

  return NextResponse.json(
    await prisma.room.update({
      where: { id: params.id },
      data: {
        messages: {
          push: msg,
        },
      },
    })
  );
}
