"use client";

import { createRoom } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function CreateButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className={
        "ml-3" +
        (isPending
          ? " btn btn-disabled text-we"
          : " btn btn-outline btn-secondary")
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

export function JoinButton() {
  const router = useRouter();
  const [popup, setPopup] = useState(false);

  function handleSubmit(e: FormData) {
    const id = e.get("id");

    setPopup(false);
    router.push(`/room/${id}`);
  }

  return (
    <>
      <button className="btn btn-ghost" onClick={() => setPopup(true)}>
        JOIN
      </button>
      {popup ? (
        <div className="fixed w-full h-full z-50 top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
          <form className="modal-box" action={handleSubmit}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setPopup(false)}
            >
              ✕
            </button>
            <h1 className="font-bold text-2xl mb-12">Enter a link</h1>

            <div className="flex">
              <input
                type="text"
                name="id"
                placeholder="Type here..."
                className="textarea h-full box-border w-full mr-2"
              />
              <button className="btn btn-primary" type="submit">
                JOIN
              </button>
            </div>
          </form>
        </div>
      ) : undefined}
    </>
  );
}
