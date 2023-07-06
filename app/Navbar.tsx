import { CreateButton } from "@/components/Buttons";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 justify-between shadow-xl">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
        appCHAT
      </Link>
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link href="#">JOIN</Link>
        </li>
        <li>
          <CreateButton />
        </li>
      </ul>
    </nav>
  );
}
