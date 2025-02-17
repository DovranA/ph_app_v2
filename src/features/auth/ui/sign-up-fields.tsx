import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import React, { useId } from "react";

export function SignUpFields({
  errors,
  formData,
}: {
  formData?: FormData;
  errors?: {
    firstName?: string;
    secondName?: string;
    password?: string;
  };
}) {
  const firstNameId = useId();
  const secondNameId = useId();
  const passwordId = useId();
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor={firstNameId}>First Name</Label>
        <Input
          id={firstNameId}
          type="text"
          name="firstName"
          placeholder="Enter your login"
          required
          defaultValue={formData?.get("firstName")?.toString()}
        />
        {errors?.firstName && <div>{errors.firstName}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={secondNameId}>Second Name</Label>
        <Input
          id={secondNameId}
          type="text"
          name="secondName"
          placeholder="Enter your login"
          required
          defaultValue={formData?.get("secondName")?.toString()}
        />
        {errors?.firstName && <div>{errors.firstName}</div>}
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
    </div>
  );
}
