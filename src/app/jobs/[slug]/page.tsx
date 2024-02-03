import JobDetails from "@/components/custom/JobDetails";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from 'react'
type PageProps = {
    params: {
        slug : string
    }
}

const getJob = cache(async (slug: string) => {
    const job = await prisma.job.findUnique({
        where : {slug}
    })
    if (!job) notFound();
    return job;
})
export async function generateStaticParams(){
    const jobs = await prisma.job.findMany({
        select : {slug : true}
    })

    return jobs.map(({ slug }) => slug);
}
export async function generateMetadata({params:{slug}}:PageProps):Promise<Metadata> {
    const job = await getJob(slug);
    return {
        title: job.title,
    }
    
}
export default async function page({ params: { slug } }: PageProps) {
    const job = await getJob(slug);
    const applyLink = job.applicationUrl ? job.applicationUrl : `mailto:${job.applicationEmail}`
    if (!applyLink) {
        console.log('not apply link is available for the job');
        notFound();
    }

  return (
    <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
          <JobDetails job={job} />
        
          <Button asChild >
              <a href={applyLink} className='w-40 md:w-fit'>Apply now</a>
          </Button>
    </main>
  )
}
