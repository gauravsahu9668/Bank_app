"use client"
import React from 'react'
import Link from 'next/link'
import logo from '../public/icons/logo.svg'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { SheetClose } from '@/components/ui/sheet'
const SideBar=({user}:SiderbarProps)=> {
    const pathname=usePathname()
  return (
  <section className=' hideBar w-[16%] h-screen p-3'>
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
                    <nav>
                    {sidebarLinks.map((item,index)=>{
                     return (
                            <Link  href={item.route} key={item.route}>
                        <div className={`p-2 flex-row rounded-md text-start mb-3 flex  ${pathname===item.route? "bg-blue-300 text-white":""}`}>  
                        <Image width={20} height={20} src={item.imgURL} alt='image' className='mt-1 mr-2'></Image>
                        <span className=''>{item.label}</span>
                        </div>
                    </Link>
                       
                    )
                    })}
                    </nav>
        </nav> 
  </section>
  )
}
export default SideBar