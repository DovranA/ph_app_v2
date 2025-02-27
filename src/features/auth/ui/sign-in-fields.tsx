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
        <Label htmlFor={loginId}>Ady</Label>
        <Input
          id={loginId}
          type="text"
          name="doctorName"
          placeholder="Ady giriziň"
          required
          defaultValue={formData?.get("doctorName")?.toString()}
        />
        {errors?.doctorName && <div>{errors.doctorName}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Açar sözi</Label>
        <Input
          id={passwordId}
          type="password"
          name="password"
          placeholder="Açar sözi"
          required
          defaultValue={formData?.get("password")?.toString()}
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
}
