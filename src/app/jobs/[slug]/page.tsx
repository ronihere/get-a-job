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

export async function generateMetadata({params:{slug}}:PageProps):Promise<Metadata> {
    const job = await getJob(slug);
    return {
        title: job.title,
    }
    
}
export default async function page({ params: { slug } }: PageProps) {
    const job = await getJob(slug);

  return (
    <div>
      {JSON.stringify(job, null , 4)}
    </div>
  )
}
