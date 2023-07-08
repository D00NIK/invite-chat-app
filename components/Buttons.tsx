"use client";

import { createRoom } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function CreateButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className={
        "ml-3" +
        (isPending
          ? " h-5 btn-disabled"
          : " outline outline-1 btn-outline btn-secondary")
      }
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const room = await createRoom();
          router.push(`/room/${room.id}`);
        });
      }}
    >
      {isPending ? <span className="loading loading-spinner"></span> : "CREATE"}
    </button>
  );
}
