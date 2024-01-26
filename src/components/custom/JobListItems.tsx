import { Job } from "@prisma/client"
import Image from "next/image"
import companyLogoPlaceHolderImage from "@/assets/company-logo-placeholder.png"
import {Banknote, Briefcase, Clock, Globe2, MapPin} from 'lucide-react'
import { formatMoney, relativeDate } from "@/lib/utils"
import Badge from "./Badge"
type JoblListItemsPrps = {
    job: Job
}
export default function JobListItems({ job: {
    title, companyName, type, approved, applicationEmail, applicationUrl, companyLogoUrl, createdAt,
    description, id, location, locationType, salary, slug, updatedAt
} }: JoblListItemsPrps) {
    return (
        <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60">
            <Image
                src={companyLogoUrl || companyLogoPlaceHolderImage}
                alt={`${companyName} logo`}
                height={100}
                width={100}
                className="rounded-lg self-center"
            />
            <div className="flex-grow space-y-3">
                <div>
                    <h2 className="text-x1 font-medium">{title}</h2>
                    <p className="text-muted-foreground">{companyName}</p>
                </div>
                <div className="text-muted-foreground">
                    <p className="flex items-center gap-1.5 sm:hidden">
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
            <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
                <Badge>{type}</Badge>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={16} />
                    {relativeDate(createdAt)}
                </span>
            </div>
        </article>
    )
}
