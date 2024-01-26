import prisma from '@/lib/prisma'
import { Job, Prisma } from '@prisma/client'
import JobListItems from './JobListItems'
import { jobFilterSchemaType } from '@/lib/validation'
type JobReasultsProps = {
    filterValues: jobFilterSchemaType
}
export default async function JobResults({ filterValues: { q, jobtypes, location, remote } }: JobReasultsProps) {
    const searchSting = q?.split(' ').filter((word) => (word.length > 0)).join(' & ');
    console.log('ss:::', q, jobtypes , location , remote)

    const searchFilter: Prisma.JobWhereInput = searchSting ?
        {
            OR: [
                { title: { search: searchSting } },
                { companyName: { search: searchSting } },
                { description: { search: searchSting } },
                { location: { search: searchSting } },
                { locationType: { search: searchSting } },
                { type: { search: searchSting } },
        ]
    }
        : {}
    
    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            jobtypes ? {type: jobtypes} : {},
            location ? { location } : {},
            remote ? {locationType : 'remote'} : {},
            {approved : true}
        ]
    }

    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: 'asc' }
    })
  return (
      <div className="grow space-y-4">
          {
              jobs.map((job: Job) => {
                  return (
                      <JobListItems key={job.id} job={job} />
                  )
              })
          }
          {
              jobs.length === 0 && 
              <p className='m-auto text-center'>
                      No Jobs found. Try adjusting search filters.
              </p>
          }
      </div>
  )
}
