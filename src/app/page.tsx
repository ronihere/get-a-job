import JobFilterSideBar from "@/components/custom/JobFilterSideBar"
import JobResults from "@/components/custom/jobResults"
import H1 from "@/components/ui/h1"
import { jobFilterSchemaType } from "@/lib/validation"

export type PagePropsFilter = {
  searchParams: {
    q?: string;
    remote?: string,
    jobtypes?: string;
    location? : string
  }
}

function getTitle({ q, jobtypes, location, remote }: jobFilterSchemaType) {
  const titlePrefix = q
    ? `${q} jobs`
    : jobtypes
      ? `${jobtypes} Developer jobs`
      : remote
        ? "Remote Developer jobs"
        : "All Developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}
export default async function Home({ searchParams: { q, remote, location, jobtypes } }: PagePropsFilter) {
  const filterValues: jobFilterSchemaType = {
    q,
    jobtypes : jobtypes === 'All Types' ? '' : jobtypes,
    location: location === 'All Location' ? '' : location,
    remote: remote === 'true'
  }
  
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSideBar defaultValue={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  )
}
