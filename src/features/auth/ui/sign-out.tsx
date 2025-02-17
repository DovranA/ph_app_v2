import { sessionService } from "@/entities/doctor/server";
import { routes } from "@/kernel/routes";
import { Button } from "@/shared/ui/button";
import { redirect } from "next/navigation";
import React from "react";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        sessionService.deleteSession();
        redirect(routes.signIn());
      }}
    >
      <Button>Sign out</Button>
    </form>
  );
}

export default SignOut;
