"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";

import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/submit-button copy";
import { useActionState } from "@/shared/lib/react";
import { SignUnFormState, signUpAction } from "../actions/sign-up";
import { routes } from "@/kernel/routes";
import { SignUpFields } from "../ui/sign-up-fields";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUnFormState
  );

  return (
    <AuthFormLayout
      title="Hasap döretmek"
      description=""
      action={action}
      fields={<SignUpFields {...formState} />}
      actions={
        <SubmitButton isPending={isPending}>Hasap doretmek</SubmitButton>
      }
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text="Sizde hasap barmy?"
          linkText="Içeri girmek"
          url={routes.signIn()}
        />
      }
    />
  );
}
