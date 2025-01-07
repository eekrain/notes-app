import React from "react";
import { fontBody, fontTitle } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="bg-white shadow-lg mb-8">
      <div className="container flex justify-between py-2">
        <a href="/" className={cn(fontTitle, "text-xl text-slate-900")}>
          <h1>MyNotes</h1>
        </a>

        <ul className={`${fontBody} flex gap-4 flex-nowrap text-sm`}>
          <li>
            <Button size={"sm"} asChild>
              <Link href={"/signin"}>Sign In</Link>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
