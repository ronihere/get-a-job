import React, { forwardRef } from 'react'
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    loading: boolean;
}

export default  function LoadingButton({loading,className,children, ...props} : LoadingButtonProps) {
  return (
    <Button {...props} {...props} disabled={props.disabled || loading} className={cn('', className)}>
      <span className='flex items-center justify-center gap-2'>
        {loading && <Loader2 size={16} className='animate-spin' />}
        {children}
      </span>
    </Button>
  )
}
