"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import H1 from "@/components/ui/h1"
import { createJobSchema, createJobSchemaTypes } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import Select from "@/components/ui/select"
import { jobTypes, locationTypes } from "@/lib/utils"
import LocationSerachInput from "@/components/custom/LocationSerachInput"
import { X } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import RickTextEditor from "@/components/custom/RickTextEditor"
import { draftToMarkdown } from "markdown-draft-js"
import LoadingButton from "@/components/custom/LoadingButton"
import { createJobPosting } from "./action"

export default function NewJobForm() {
    const form = useForm<createJobSchemaTypes>({
        resolver: zodResolver(createJobSchema)
    })
    const { handleSubmit, watch, register, formState: { isSubmitting, errors }, setFocus, setValue,
        reset, trigger, control } = form;

    async function onSubmit(values: createJobSchemaTypes){
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            // console.log('value', value);
            if (value) {
                // console.log('inside')
                formData.append(key, value);
            }
        });
        console.log('email::', JSON.stringify(values.applicationEmail, null, 4))

        console.log('desc::', JSON.stringify(values.description, null, 4))
        try {
            await createJobPosting(formData);
        } catch (error) {
            alert("Something went wrong, please try again.");
        }
    }
    return <main className="max-w-3xl m-auto my-10 space-y-10">
        <div className="space-y-5 text-center">
            <H1>
                Find your perfect Developer
            </H1>
            <p className="text-muted-foreground">
                Get your job posting seen by thousand of job seekers
            </p>
        </div>
        <div className="space-y-6 border rounded-lg p-4">
            <div>
                <h2 className="font-semibold">
                    Job Details
                </h2>
                <p className="text-muted-foreground">
                    Provide a job description
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        control={control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Frontend Developer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    >



                    </FormField>
                    <FormField
                        control={control}
                        name='type'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Types</FormLabel>
                                <FormControl>
                                    <Select {...field}>
                                        <option hidden>Select an option</option>
                                        {jobTypes.map(ele => <option key={ele}>{ele}</option>)}
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    >

                    </FormField>
                    <FormField
                        control={control}
                        name='companyName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="company name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    >

                    </FormField>

                    <FormField
                        name='companyLogo'
                        control={control}
                        render={({ field: { value, ...rest } }) => (
                            <FormItem>
                                <FormLabel>
                                    Company Logo
                                </FormLabel>
                                <FormControl>
                                    <Input type="file" {...rest} onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        rest.onChange(file);
                                    }} accept="image/*" />
                                </FormControl>
                            </FormItem>
                        )}
                    >

                    </FormField>

                    <FormField
                        control={control}
                        name='locationType'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location Types</FormLabel>
                                <FormControl>
                                    <Select {...field}>
                                        <option hidden>Select an option</option>
                                        {locationTypes.map(ele => <option key={ele}>{ele}</option>)}
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    >

                    </FormField>
                    <FormField
                        name='location'
                        control={control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Location
                                </FormLabel>
                                <FormControl>
                                    <LocationSerachInput onLocationSelected={field.onChange} placeholder='search for a location' {...field} />
                                </FormControl>

                                {watch('location') &&
                                    <button className="flex gap-2 shadow-sm" onClick={() => setValue("location", "", { shouldValidate: true })}>
                                        <p>{watch('location')}</p>
                                        <X size={14} className="bg-muted border" />
                                    </button>
                                }
                                <FormMessage />
                            </FormItem>
                        )}
                    >

                    </FormField>


                    <div className="space-y-4">
                        <Label htmlFor="applicationEmail">How to apply</Label>
                        <div className="flex justify-between items-center gap-2">

                            <FormField control={control} name="applicationEmail" render={({ field }) => (
                                <FormItem className="grow">

                                    <FormControl>
                                        <Input type="email" placeholder="Email" id="applicationEmail" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}>
                            </FormField>
                            <div>Or</div>
                            <FormField control={control} name="applicationUrl" render={({ field }) => (
                                <FormItem className="grow">
                                    <FormControl>
                                        <Input type="url" placeholder="Website" id="applicationUrl" {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                trigger('applicationEmail')
                                            }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>

                            </FormField>
                        </div>
                    </div>

                        <FormField
                            control={control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="salary" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                            }
                        >
                        </FormField>

                        <FormField
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="description" onClick={() => setFocus('description')}>Description</Label>
                                    <FormControl>

                                        <RickTextEditor {...field} onChange={(draft) => {
                                            field.onChange(draftToMarkdown(draft))
                                        }} ref={field.ref} />
                                    </FormControl>
                                        <FormMessage/>
                                </FormItem>
                            )
                            }
                        >
                        </FormField>

                    <LoadingButton type="submit" loading={isSubmitting}>Submit</LoadingButton>
                </form>
            </Form>
        </div>
    </main>
}

