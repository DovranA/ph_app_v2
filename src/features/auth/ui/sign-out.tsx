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
      <Button className="bg-white font-semibold hover:bg-blue-50 text-blue-500 ">
        Çykmak
      </Button>
    </form>
  );
}

export default SignOut;
