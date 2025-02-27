import { sessionService } from "@/entities/doctor/server";
import { patientListService } from "@/entities/patient/server";
import { DataTable } from "./table/data-table";
import { columns } from "./table/column";
type Props = {
  page?: string;
  search?: string;
};
async function PatientList({ page, search }: Props) {
  const { session } = await sessionService.verifySession();
  const { patients, total } = await patientListService({
    doctorId: session.id,
    page: !isNaN(Number(page)) ? Number(page) : 0,
    search,
  });

  return (
    <div className="mx-auto py-10 w-full">
      <DataTable columns={columns} data={patients} total={total} />
    </div>
  );
}

export default PatientList;
