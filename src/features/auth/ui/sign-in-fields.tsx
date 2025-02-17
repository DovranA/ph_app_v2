import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import React, { useId } from "react";

export function SignInFields({
  errors,
  formData,
}: {
  formData?: FormData;
  errors?: {
    doctorName?: string;
    password?: string;
  };
}) {
  const loginId = useId();
  const passwordId = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type="text"
          name="doctorName"
          placeholder="Enter your login"
          required
          defaultValue={formData?.get("doctorName")?.toString()}
        />
        {errors?.doctorName && <div>{errors.doctorName}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          defaultValue={formData?.get("password")?.toString()}
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
}
