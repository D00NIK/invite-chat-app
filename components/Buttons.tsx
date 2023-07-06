"use client";

import { Room } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateButton() {
  const { push } = useRouter();
  const [disabled, setDisabled] = useState(false);

  async function createNewRoom() {
    if (disabled) return;
    setDisabled(true);

    const room: Room = await fetch("http://localhost:3000/api/room", {
      method: "POST",
    }).then((res) => res.json());
    push(`/room/${room.id}`);

    setDisabled(false);
  }

  return (
    <button
      className={
        "ml-3" +
        (disabled
          ? " btn-disabled"
          : " outline outline-1 btn-outline btn-secondary")
      }
      disabled={disabled}
      onClick={createNewRoom}
    >
      CREATE
    </button>
  );
}
