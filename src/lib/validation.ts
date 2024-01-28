import { z } from 'zod'
import { jobTypes, locationTypes } from './utils'

const requiredString = z.string().min(1, 'required')

// const companyLogoSchema = z.custom<File | undefined>().refine(file => !file || (file instanceof File && file.type.startsWith("image/")), "must be an image file").refine(file => {
//     return !file || file.size <1024 * 1024 * 2
// }, 'File must be less than 2MB')

const companyLogoSchema = z
  .custom<File | undefined>()
//   .refine(
//     (file) => !file || (file instanceof File && file.type.startsWith("image/")),
//     "Must be an image file",
//   )
//   .refine((file) => {
//     return !file || file.size < 1024 * 1024 * 2;
//   }, "File must be less than 2MB");

const applicationSchema = z.object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
}).refine(val => val.applicationEmail || val.applicationUrl, { message:"Either of application Email or application Url must be provided", path: ['applicationEmail']})

const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number")

const locationSchema = z.object({
    locationType: requiredString.refine(val => locationTypes.includes(val), "Invalid location type"),
    location: requiredString.max(100).optional()
}).refine(data => {
    return !data.locationType || data.locationType === 'Remote' || data.location, {
        message: 'Location is required for On-site and Hybrid jobs!',
        path: ['location']
    }
})

export const createJobSchema = z.object({
    title: requiredString.max(100),
    type: requiredString.refine(value => jobTypes.includes(value), 'Invalid job type!'),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    salary: numericRequiredString.max(9, 'Number must be less than 9 digits'),
    description: requiredString.max(500)
})
    .and(applicationSchema)
    .and(locationSchema)

export type createJobSchemaTypes= z.infer<typeof createJobSchema>

export const jobFilterSchema = z.object({
    q: z.string().optional(),
    jobtypes: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
})

export type jobFilterSchemaType = z.infer<typeof jobFilterSchema>