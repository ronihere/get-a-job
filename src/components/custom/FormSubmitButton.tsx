'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FormSubmitButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending} = useFormStatus();
  return (
      <Button {...props} type="submit" disabled={ props.disabled || pending} className={cn('', className)}>
          <span className='flex items-center justify-center gap-2'>
              {pending && <Loader2 size={16} className='animate-spin' />}
              {props.children}
      </span>
    </Button>
  )
}
