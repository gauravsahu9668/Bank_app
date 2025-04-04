"use client"
import React from 'react'
import Link from 'next/link'
import logo from '../public/icons/logo.svg'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { SheetClose } from '@/components/ui/sheet'
import Footer from '@/components/ui/Footer'
import PlaidLink from './PlaidLink'
import ConnectPopUp from './ConnectPopUp'
const SideBar=({user}:SiderbarProps)=> {
  const pathname=usePathname()
  return (
//   <section className=' hideBar w-[16%] h-screen p-3'>
//         <nav className='w-full flex flex-col p-3'>
//             <Link href="/"
//             className='mb-12 cursor-pointer items-center flex flex-row justify-center p-4 gap-2'
//             >
//                <Image src={'/icons/logo.svg'} alt="Horizon logo"
//                width={40}
//                height={40}
//                className=''
//                ></Image>
//                <h1 className='text-black text-[25px] font-bold mt-5 mb-2'>
//                 Horizon
//                </h1>
//             </Link>
//             <nav>
//                     {sidebarLinks.map((item,index)=>{
//                      return (
//                             <Link  href={item.route} key={item.route}>
//                         <div className={`p-2 flex-row rounded-md text-start mb-3 flex  ${pathname===item.route? "bg-blue-300 text-white":""}`}>  
//                         <Image width={20} height={20} src={item.imgURL} alt='image' className='mt-1 mr-2'></Image>
//                         <span className=''>{item.label}</span>
//                         </div>
//                     </Link>
//                     )
//                     })}
//             </nav>
//         <PlaidLink user={user}></PlaidLink>    
//         </nav> 
//         <Footer user={user}></Footer>
//   </section>
  <section className='hideBar w-64 max-h-screen bg-white border-r border-gray-200 p-6 flex flex-col'>
     <nav className='flex-1 flex flex-col'>
    {/* Logo Section */}
    <Link 
      href="/"
      className='mb-8 flex items-center justify-start p-2 rounded-lg hover:bg-gray-50 transition-colors'
    >
      <Image 
        src='/icons/logo.svg' 
        alt="Horizon logo"
        width={34}
        height={34}
        className='object-contain'
      />
      <h1 className='ml-3 text-2xl font-bold text-gray-900'>
        Horizon
      </h1>
    </Link>

    {/* Navigation Links */}
    <nav className='flex-1 space-y-1'>
      {sidebarLinks.map((item) => (
        <Link 
          href={item.route} 
          key={item.route}
          className='block'
        >
          <div className={`
            flex items-center p-3 rounded-lg 
            transition-colors duration-200
            ${pathname === item.route 
              ? 'bg-[#0179FE] text-white' 
              : 'text-gray-700 hover:bg-gray-100'}
          `}>
            <Image 
              width={20} 
              height={20} 
              src={item.imgURL} 
              alt={item.label}
              className='shrink-0'
            />
            <span className='ml-3 font-medium'>{item.label}</span>
          </div>
        </Link>
      ))}
      <ConnectPopUp user={user}></ConnectPopUp>
    </nav>
     </nav>
  <Footer user={user}  />
  </section>
  )
}
export default SideBar