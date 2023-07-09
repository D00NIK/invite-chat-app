import { CreateButton, JoinButton } from "@/components/Buttons";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-12 flex bg-base-100 justify-between shadow-xl px-2 ">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
        appCHAT
      </Link>
      <ul className="flex items-center">
        <li>
          <JoinButton />
        </li>
        <li>
          <CreateButton />
        </li>
      </ul>
    </nav>
  );
}
