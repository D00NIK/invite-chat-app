"use client";
import fetcher from "@/lib/fetcher";
import { Room } from "@prisma/client";
import useSWR from "swr";

interface Props {
  params: { id: string };
}

export default function Room({ params }: Props) {
  const { data, error, isLoading } = useSWR(`/api/room/${params.id}`, fetcher);

  if (error) return <h1>error</h1>;
  if (data) return <h1>data</h1>;
  return <h1>isLoading</h1>;
}
