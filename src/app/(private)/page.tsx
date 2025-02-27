import { CreatePatentForm, PatientList } from "@/features/patient";
import { sessionService } from "@/entities/doctor/server";
import { Button } from "@/shared/ui/button";
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.index as string;
  const search = resolvedSearchParams.s as string;
  const {
    session: { id },
  } = await sessionService.verifySession();
  return (
    <div className="flex flex-col gap-2 w-full px-5 mx-auto pt-[50px] ">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold text-blue-600">Näsaglar</h1>
        <CreatePatentForm
          actions={
            <Button
              type="submit"
              className="w-36 mt-10  bg-blue-500 hover:bg-blue-500/80 font-semibold"
            >
              Näsag goşmak
            </Button>
          }
          doctorId={id}
        />
      </div>
      <PatientList page={page} search={search} />
    </div>
  );
}
