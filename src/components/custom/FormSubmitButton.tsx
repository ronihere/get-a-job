'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import LoadingButton from './LoadingButton';

export default function FormSubmitButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending} = useFormStatus();
  return (
    <LoadingButton loading={pending} type='submit' {...props} className=''/>
  )
}
