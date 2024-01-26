import React from 'react'
import logo from "@/assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function CustomNav() {
  return (
    <header className='shadow-sm p-4'>
          <nav className='max-w-5xl m-auto flex justify-between'>
              <Link href='/' className='flex items-center gap-2'>
                  <Image src={logo.src} height={40} width={40} alt='JobBoard Logo' /> 
                  <p className='tracking-tight text-xl font-bold'>Flow Jobs</p>
              </Link>
              <Button asChild>
                  <Link href={'/jpbs/new'}>Post a Job</Link>
              </Button>
  </nav>
    </header>
  )
}
