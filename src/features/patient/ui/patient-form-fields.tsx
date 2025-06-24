"use client";
import { DatePicker } from "@/shared/ui/date-picker";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import React, { useId, useRef, useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Inputs } from "../actions/create-patient";

export function PatentFormFields({
  doctorId,
  register,
  errors,
  control,
}: {
  formData?: FormData;
  doctorId?: string;
  control?: Control<Inputs>;
  register: UseFormRegister<Inputs>;
  errors?: FieldErrors<Inputs>;
}) {
  const firstNameId = useId();
  const secondNameId = useId();
  const birthdayId = useId();
  const genderId = useId();
  const addressId = useId();
  const diagnoseId = useId();
  const enterAtId = useId();
  const docId = useId();
  const nationalityId = useId();
  const sectionId = useId();

  return (
    <div className="flex gap-5">
      <Input
        id={docId}
        name="doctorId"
        type="text"
        value={doctorId}
        className="hidden"
        readOnly
      />
      <div className="flex flex-col flex-1 gap-2">
        <div className="space-y-2">
          <Label htmlFor={firstNameId}>Ady</Label>
          <Input
            id={firstNameId}
            type="text"
            {...register("firstName", { required: "Ady ýazylmaly" })}
            placeholder="Ady"
          />
          {errors?.firstName && (
            <div className="text-red-500 text-sm">
              {errors.firstName.message}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={secondNameId}>Familýasy</Label>
          <Input
            id={secondNameId}
            type="text"
            {...register("secondName", { required: "Familiya ýazylmaly" })}
            placeholder="Familyasy"
          />
          {errors?.secondName && (
            <div className="text-red-500 text-sm">
              {errors.secondName.message}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={genderId}>Jynsy</Label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "jynsyny saylan" }}
            render={({ field }) => (
              <>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  {...field}
                >
                  <SelectTrigger id={genderId} className="">
                    <SelectValue placeholder="Jynsy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Erkek</SelectItem>
                    <SelectItem value="F">Zenan</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.gender && (
                  <div className="text-red-500 text-sm">
                    {errors.gender.message}
                  </div>
                )}
              </>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={nationalityId}>Milleti</Label>
          <Input
            id={nationalityId}
            type="text"
            {...register("nationality", { required: "Milleti ýazylmaly" })}
            placeholder="Milleti"
          />
          {errors?.nationality && (
            <div className="text-red-500 text-sm">
              {errors.nationality.message}
            </div>
          )}
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor={birthdayId}>Doglan senesi</Label>
          <DatePicker
            id={birthdayId}
            control={control}
            name="birthday"
            placeholder="Doglan senesi"
          />
          {errors?.birthday && (
            <div className="text-red-500 text-sm">
              {errors.birthday.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="space-y-2 flex flex-col flex-1">
          <Label htmlFor={addressId}>Salgysy</Label>
          <Textarea
            id={addressId}
            {...register("address", { required: "Salgysy ýazylmaly" })}
            name="address"
            placeholder="Salgysy"
            style={{ resize: "none" }}
            className="h-24"
          />
          {errors?.address && (
            <div className="text-red-500 text-sm">{errors.address.message}</div>
          )}
        </div>
        <div className="space-y-2 flex flex-col flex-1">
          <Label htmlFor={diagnoseId}>Kesel kesgidi</Label>
          <Textarea
            id={diagnoseId}
            {...register("diagnose", { required: "Kesel kesgidi ýazylmaly" })}
            placeholder="Kesel kesgidi"
            style={{ resize: "none" }}
            className="h-24"
          />
          {errors?.diagnose && (
            <div className="text-red-500 text-sm">
              {errors.diagnose.message}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={sectionId}>Bölümi</Label>
          <Input
            id={sectionId}
            type="text"
            {...register("section", { required: "Bölümi ýaz" })}
            placeholder="Bölüm"
          />
          {errors?.section && (
            <div className="text-red-500 text-sm">{errors.section.message}</div>
          )}
        </div>
        <div className="space-y-2 flex flex-col flex-1">
          <Label htmlFor={enterAtId}>Giren senesi</Label>
          <DatePicker
            placeholder="Giren senesi"
            id="enterAtId"
            name="enterAt"
            control={control}
            // ref={enterAtRef}
          />
          {errors?.enterAt && (
            <div className="text-red-500 text-sm">{errors.enterAt.message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
