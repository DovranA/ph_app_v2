import { sessionService } from "@/entities/doctor/server";
import { SignOut } from "@/features/auth";
import { DoctorName } from "@/features/doctor";
import { routes } from "@/kernel/routes";
import { Button } from "@/shared/ui/button";
import { redirect } from "next/navigation";

import React from "react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await sessionService.verifySession();

  return (
    <div className="flex flex-col grow">
      <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">PH APP</div>
        <div className="flex gap-4 items-center">
          <DoctorName />
          <SignOut />
        </div>
      </header>
      {children}
    </div>
  );
}
