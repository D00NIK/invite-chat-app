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
            <textarea
              value={msg}
              readOnly={true}
              maxLength={500}
              wrap="soft"
              className="resize-none bg-base-300 mb-2 p-2 rounded-lg"
            />
          ))}
        </div>
      )}
      <form
        className="fixed h-12 bottom-0 w-full flex justify-center"
        action={handleSubmit}
      >
        <input
          type="text"
          name="msg"
          className="textarea h-full box-border resize-none max-w-3xl w-full bg-base-200"
          placeholder="Type here..."
        />
        <button
          className="btn btn-primary box-border h-full ml-1"
          type="submit"
        >
          Send
        </button>
      </form>
    </>
  );
}
