import prisma from '@/lib/prisma'
import { Job, Prisma } from '@prisma/client'
import JobListItems from './JobListItems'
import { jobFilterSchemaType } from '@/lib/validation'
import Link from 'next/link'
type JobReasultsProps = {
    filterValues: jobFilterSchemaType
}
export const dynamic = 'force-dynamic';
export default async function JobResults({ filterValues: { q, jobtypes, location, remote } }: JobReasultsProps) {
    const searchSting = q?.split(' ').filter((word) => (word.length > 0)).join(' & ');

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
            // {approved : true }
        ]
    }

    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: 'asc' }
    })
    console.log('jobs:::', jobs.length)
  return (
      <div className="grow space-y-4">
          {
              jobs.map((job: Job) => {
                  return (
                      <Link key={job.id} href={`/jobs/${job.slug}`} className='block'>
                      <JobListItems  job={job} />
                      </Link>
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
