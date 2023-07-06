import { Room } from "@prisma/client";

interface Props {
  params: { id: string };
}

export default async function Room({ params }: Props) {
  const room: Room = await fetch(
    `http://localhost:3000/api/room/${params.id}`
  ).then((res) => res.json());

  if (!room)
    return (
      <h1 className="text-center text-4xl text-red-500">
        This room does not exist.
      </h1>
    );

  return <div>{room?.id}</div>;
}
