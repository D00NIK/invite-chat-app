import { prisma } from "@/lib/prisma";
import { Room } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Props {
  params: { id: string };
}

export default async function Room({ params }: Props) {
  const room = await prisma.room.findUnique({ where: { id: params.id } });

  async function handleSubmit(formData: FormData) {
    "use server";

    await prisma.room.update({
      where: { id: params.id },
      data: {
        messages: {
          push: formData.get("msg") as string,
        },
      },
    });

    revalidatePath(`/room/${params.id}`);
  }

  if (!room)
    return (
      <h1 className="text-red-500 text-center text-2xl mt-5">
        Unable to fetch room's data
      </h1>
    );

  return (
    <>
      {room.messages.length === 0 ? (
        <h1 className="text-center mt-5 text-xl">
          No messages found! Start typing...
        </h1>
      ) : (
        <div className="flex flex-col items-center pb-12">
          {room.messages.map((msg) => (
            <div className="rounded p-1 my-2 max-w-[80%] break-words bg-primary text-white">
              {msg}
            </div>
          ))}
        </div>
      )}
      <form
        className="fixed -z-[1] h-12 bottom-0 w-full flex justify-center"
        action={handleSubmit}
      >
        <input
          type="text"
          name="msg"
          className="textarea h-full box-border resize-none max-w-3xl w-full bg-base-200"
          placeholder="Type here..."
        />
        <button
          className="btn btn-secondary box-border h-full ml-1"
          type="submit"
        >
          Send
        </button>
      </form>
    </>
  );
}
