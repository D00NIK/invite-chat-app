"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export async function createRoom() {
  const room = await prisma.room.create({
    data: {
      id: undefined,
    },
  });

  revalidatePath(`/room/${room.id}`);
  return room;
}
