import { formatMoney, relativeDate } from '@/lib/utils'
import { Job } from '@prisma/client'
import { Banknote, Briefcase, Clock, Globe2, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Markdown from './Markdown'
import { Button } from '../ui/button'
interface JobPageProps {
    job: Job
}
export default function JobDetails({ job: {
    title,
    description,
    companyLogoUrl, companyName, applicationUrl, applicationEmail, approved, createdAt, id, location,
    locationType, salary,
    slug, type, updatedAt
} }: JobPageProps) {

    return (
        <section className='w-full grow space-y-5'>
            <div className='flex items-center gap-3'>
                <div>

                {
                    companyLogoUrl && (
                        <Image src={companyLogoUrl} alt={`${title} logo`} width={100} height={100} className='rounded-xl' />
                        )
                    }
                </div>
                <div>
                    <h1 className='text-xl font-bold'>{title}</h1>
                    <p className='font-semibold'>

                        {
                            applicationUrl ? <Link href={new URL(applicationUrl).origin} className='text-green-500 hover:underline' target='_blank'>{companyName}</Link> :
                                <span>{companyName}</span>
                        }
                    </p>
                    <div className="text-muted-foreground">
                        <p className="flex items-center gap-1.5">
                            <Briefcase size={16} className="shrink-0" />
                            {type}
                        </p>
                        <p className="flex items-center gap-1.5">
                            <MapPin size={16} className="shrink-0" />
                            {locationType}
                        </p>
                        <p className="flex items-center gap-1.5">
                            <Globe2 size={16} className="shrink-0" />
                            {location || 'Worldwide'}
                        </p>
                        <p className="flex items-center gap-1.5">
                            <Banknote size={16} className="shrink-0" />
                            {formatMoney(salary)}
                        </p>
                        <p className="flex items-center gap-1.5 sm:hidden">
                            <Clock size={16} className="shrink-0" />
                            {relativeDate(createdAt)}
                        </p>
                    </div>
                </div>
            </div>
            {/* <div> */}
                
                
                <div className='my-10'>
                    {description && 
                        (
                        <Markdown>
                            {description}
                        </Markdown>
                    )
                    }
                </div>
             
            {/* </div> */}
        </section>
    )
}

