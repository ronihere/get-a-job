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

export default function NewJobForm() {
    const form = useForm<createJobSchemaTypes>({
        resolver: zodResolver(createJobSchema)
    })
    const { handleSubmit,watch, register, formState: { isSubmitting, errors },setValue,
        reset, trigger, control } = form;
    
    const onSubmit = (data : createJobSchemaTypes) => {
        console.log(JSON.stringify(data , null ,2))
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
                <form noValidate className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        control={control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Frontend Developer" {...field} />
                                </FormControl>
                                <FormMessage/>
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
                                    <Select>
                                        <option hidden>Select an option</option>
                                        {jobTypes.map(ele => <option key={ele}>{ele }</option>)}
                                    </Select>
                                </FormControl>
                                <FormMessage/>
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
                        render={({ field :{value , ...rest} }) => (
                            <FormItem>
                                <FormLabel>
                                Company Logo
                                </FormLabel>
                                <FormControl>
                                    <Input type="file" {...rest} accept="image/*" />
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
                                    <Select>
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
                                    <LocationSerachInput onLocationSelected={(location : string)=> console.log(location)} placeholder='search for a location' {...field} />
                                </FormControl>
                                {/* {watch('location')} */}
                                <FormMessage/>
                                </FormItem>
                        )}
                    >

                    </FormField>
</form>
            </Form>
        </div>
    </main>
}