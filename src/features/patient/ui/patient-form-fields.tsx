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
import React, { useId } from "react";

export function PatentFormFields({
  errors,
  doctorId,
  patient,
}: {
  formData?: FormData;
  doctorId?: string;
  patient?: {
    id: string;
    firstName: string;
    secondName: string;
    doctorId: string;
    birthday: Date;
    gender: string;
    nationality: string;
    section: string;
    medicalHistory: string | null;
    address: string;
    diagnose: string | null;
    enterAt: Date;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null;
  errors?: {
    firstName?: string;
    secondName?: string;
    birthday?: string;
    gender?: string;
    address?: string;
    diagnose?: string;
    enterAt?: string;
  };
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
            name="firstName"
            placeholder="Ady"
            defaultValue={patient?.firstName}
          />
          {errors?.firstName && (
            <div className="text-red-500 text-sm">{errors.firstName}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={secondNameId}>Familýasy</Label>
          <Input
            id={secondNameId}
            type="text"
            name="secondName"
            placeholder="Familyasy"
            defaultValue={patient?.secondName}
          />
          {errors?.secondName && (
            <div className="text-red-500 text-sm">{errors.secondName}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={genderId}>Jynsy</Label>
          <Select name="gender">
            <SelectTrigger id={genderId} className="">
              <SelectValue defaultValue={patient?.gender} placeholder="Jynsy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Erkek</SelectItem>
              <SelectItem value="F">Zenan</SelectItem>
            </SelectContent>
          </Select>
          {errors?.gender && (
            <div className="text-red-500 text-sm">{errors.gender}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={nationalityId}>Milleti</Label>
          <Input
            id={nationalityId}
            type="text"
            name="nationality"
            placeholder="Milleti"
            defaultValue={patient?.nationality}
          />
          {errors?.firstName && (
            <div className="text-red-500 text-sm">{errors.firstName}</div>
          )}
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor={birthdayId}>Doglan senesi</Label>
          <DatePicker
            defaultValue={patient?.birthday && new Date(patient?.birthday)}
            name="birthday"
            id={birthdayId}
            placeholder="Doglan senesi"
          />
          {errors?.birthday && (
            <div className="text-red-500 text-sm">{errors.birthday}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="space-y-2 flex flex-col flex-1">
          <Label htmlFor={addressId}>Address</Label>
          <Textarea
            id={addressId}
            name="address"
            placeholder="Address"
            defaultValue={patient?.address ?? ""}
            style={{ resize: "none" }}
            className="h-24"
          />
          {errors?.address && (
            <div className="text-red-500 text-sm">{errors.address}</div>
          )}
        </div>
        <div className="space-y-2 flex flex-col flex-1">
          <Label htmlFor={diagnoseId}>Diagnose</Label>
          <Textarea
            id={diagnoseId}
            name="diagnose"
            placeholder="Diagnose"
            defaultValue={patient?.diagnose ?? ""}
            style={{ resize: "none" }}
            className="h-24"
          />
          {errors?.diagnose && (
            <div className="text-red-500 text-sm">{errors.diagnose}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={sectionId}>Bölümi</Label>
          <Input
            id={sectionId}
            type="text"
            name="section"
            placeholder="Bölüm"
            defaultValue={patient?.section}
          />
          {errors?.firstName && (
            <div className="text-red-500 text-sm">{errors.firstName}</div>
          )}
        </div>
        <div className="space-y-2 flex flex-col flex-1">
          <Label htmlFor={enterAtId}>Giren senesi</Label>
          <DatePicker
            defaultValue={patient?.enterAt && new Date(patient?.enterAt)}
            name="enterAt"
            placeholder="Giren senesi"
            id="enterAtId"
          />
          {errors?.enterAt && (
            <div className="text-red-500 text-sm">{errors.enterAt}</div>
          )}
        </div>
      </div>
    </div>
  );
}
