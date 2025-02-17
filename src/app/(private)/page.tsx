import { CreatePatentForm, PatientList } from "@/features/patient";
import { sessionService } from "@/entities/doctor/server";
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
}
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
    <div className="flex flex-col gap-2 container mx-auto pt-[50px]">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Patient list</h1>
        <CreatePatentForm doctorId={id} />
      </div>
      <PatientList page={page} search={search} />
    </div>
  );
}
