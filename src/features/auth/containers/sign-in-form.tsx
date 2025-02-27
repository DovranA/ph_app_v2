"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/submit-button copy";
import { useActionState } from "@/shared/lib/react";
import { routes } from "@/kernel/routes";
import { signInAction, SignInFormState } from "../actions/sign-in";
import { SignInFields } from "../ui/sign-in-fields";

export function SignInForm() {
  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState
  );

  return (
    <AuthFormLayout
      title="Içeri girmek"
      description=""
      action={action}
      fields={<SignInFields {...formState} />}
      actions={<SubmitButton isPending={isPending}>Iceri girmek</SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text="Sizeň hasabyňyz ýokmy?"
          linkText="Hasap açmak"
          url={routes.signUp()}
        />
      }
    />
  );
}
