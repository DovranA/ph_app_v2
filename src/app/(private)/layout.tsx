import { SignOut } from "@/features/auth";
import { DoctorName } from "@/features/doctor";
import Link from "next/link";

import React from "react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col grow ">
      <header className="px-10 py-4 flex flex-row gap-4 bg-blue-500 text-white justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">
          <Link href="/">PH APP</Link>
        </div>
        <div className="flex gap-4 items-center">
          <DoctorName />
          <SignOut />
        </div>
      </header>
      {children}
    </div>
  );
}
