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
  formData,
  doctorId,
}: {
  formData?: FormData;
  doctorId: string;
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
          <Label htmlFor={firstNameId}>First Name</Label>
          <Input
            id={firstNameId}
            type="text"
            name="firstName"
            placeholder="Enter patient first name"
            defaultValue={formData?.get("firstName")?.toString()}
          />
          {errors?.firstName && (
            <div className="text-red-500 text-sm">{errors.firstName}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={secondNameId}>Second Name</Label>
          <Input
            id={secondNameId}
            type="text"
            name="secondName"
            placeholder="Enter your password"
            defaultValue={formData?.get("secondName")?.toString()}
          />
          {errors?.secondName && (
            <div className="text-red-500 text-sm">{errors.secondName}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={genderId}>Gender</Label>
          <Select name="gender">
            <SelectTrigger id={genderId} className="">
              <SelectValue
                defaultValue={formData?.get("gender")?.toString()}
                placeholder="Gender"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="F">F</SelectItem>
            </SelectContent>
          </Select>
          {errors?.gender && (
            <div className="text-red-500 text-sm">{errors.gender}</div>
          )}
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor={birthdayId}>Birthday</Label>
          <DatePicker
            defaultValue={formData?.get("birthday")}
            name="birthday"
            placeholder="Enter birthday"
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
            placeholder="Enter address"
            defaultValue={formData?.get("address")?.toString()}
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
            placeholder="Enter diagnose"
            defaultValue={formData?.get("diagnose")?.toString()}
            style={{ resize: "none" }}
            className="h-24"
          />
          {errors?.diagnose && (
            <div className="text-red-500 text-sm">{errors.diagnose}</div>
          )}
        </div>
        <div className="space-y-2 flex flex-col flex-1">
          <Label htmlFor={enterAtId}>Birthday</Label>
          <DatePicker
            defaultValue={formData?.get("enterAt")}
            name="enterAt"
            placeholder="Enter day of patient"
          />
          {errors?.enterAt && (
            <div className="text-red-500 text-sm">{errors.enterAt}</div>
          )}
        </div>
      </div>
    </div>
  );
}
