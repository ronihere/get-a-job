import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Select from '../ui/select'
import prisma from "@/lib/prisma"
import { jobTypes } from '@/lib/utils'
import { jobFilterSchema, jobFilterSchemaType } from '@/lib/validation'
import { redirect } from 'next/navigation'
import FormSubmitButton from './FormSubmitButton'


type JobFilterSideBarProps = {
    defaultValue: jobFilterSchemaType
}


const filterJobs = async (formData: FormData) => {
    "use server"
    const values = Object.fromEntries(formData.entries());
    const parsedResults = jobFilterSchema.parse(values);
    const { q, jobtypes , remote , location} = parsedResults
    // console.log('PR::', parsedResults)
    const searchParams = new URLSearchParams({
        ...(q && { q: q.trim() }),
        ...(jobtypes && { jobtypes }),
        ...(location && { location }),
        ...(remote && {remote: "true"})
    })
    redirect(`/?${searchParams.toString()}`)
}

export default async function JobFilterSideBar({defaultValue} : JobFilterSideBarProps) {
    const distinctLocation = (await prisma.job.findMany({
        where: { approved: true },
        select: { location: true },
        distinct:['location']
    }).then(locations => locations.map(({ location })=>(location)).filter(Boolean))) as string[]
    return (
        <aside className='md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg'>
            <form action={filterJobs} key={JSON.stringify(defaultValue)}>
                <div className='space-y-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='q'>Search</Label>
                        <Input id='q' name='q' placeholder='Title, Compant etc...' defaultValue={defaultValue.q} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='location'>Location</Label>
                        <Select id='location' name='location' defaultValue={defaultValue.location}>
                            <option value="All Location">All Location</option>
                            {distinctLocation.map(location => <option key={location} value={location}>{location}</option>)}
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='jobtypes'>Job Type</Label>
                        <Select id='jobtypes' name='jobtypes' defaultValue={defaultValue.jobtypes}>
                            <option value="All Types">All Types</option>
                            {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='checkbox' id='remote' className='accent-black scale-110' name='remote' defaultChecked={defaultValue.remote} />
                        <Label htmlFor='remote'>Remote Jobs</Label>
                    </div>
                    {/* <Button type='submit' className='w-full'>Filter Jobs</Button> */}
                    <FormSubmitButton className='w-full'>
                        Filter Jobs
                    </FormSubmitButton>
                </div>
            </form>
        </aside>
    )
}
