import React from 'react'
type BadgeProps = {
    children : React.ReactNode
}
export default function Badge({children}: BadgeProps) {
  return (
    <span className='border rounded px-2 py-0.5 bg-muted text-muted-foreground font-medium text-sm'>
          { children}
    </span>
  )
}