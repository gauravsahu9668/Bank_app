"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import Footer from '@/components/ui/Footer'
import PlaidLink from './PlaidLink'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
const MobileNav = ({user}:MobileNavProps) => {
    const pathname=usePathname()
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
           <SheetTrigger>
    <Image src='/icons/hamburger.svg'
    width={30} height={30} alt='menu'></Image>
           </SheetTrigger>
           <SheetContent side="left">
             <nav className='w-full flex flex-col p-3'>
            <Link href="/"
            className='mb-12 cursor-pointer items-center flex flex-row justify-center p-4 gap-2'
            >
               <Image src={'/icons/logo.svg'} alt="Horizon logo"
               width={40}
               height={40}
               className=''
               ></Image>
               <h1 className='text-black text-[25px] font-bold mt-5 mb-2'>
                Horizon
               </h1>
            </Link>
            <div>
            {sidebarLinks.map((item,index)=>{
                return (
                    <SheetClose asChild key={item.route}>
                        <Link  href={item.route} >
                        <div className={`p-2 flex-row rounded-md text-start mb-3 flex  ${pathname===item.route? "bg-blue-300 text-white":""}`}>  
                        <Image width={20} height={20} src={item.imgURL} alt='image' className='mt-1 mr-2'></Image>
                        <span>{item.label}</span>
                        </div>
                    </Link>
                    </SheetClose>
                    
                )
            })}
            </div>
            <PlaidLink user={user}></PlaidLink>   
             </nav>  
             <div className='w-full mt-20 relative flex items-center justify-center bg-gray-50 shadow-md py-4 px-6'>
                <Footer user={user} type='mobile'></Footer>
             </div>
           </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav
