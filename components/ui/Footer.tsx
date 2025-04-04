import React from 'react'
import Image from 'next/image'
import { logoutAction } from '@/lib/actions/user.actions'
import { redirect, useRouter } from 'next/navigation'
const Footer = ({user,type="desktop"}:FooterProps)=>{
    const handleLogout=async()=>{
        const loggedOut= await logoutAction()
        if(loggedOut)  redirect('/sign-in')
    }
  return (
    <footer className="flex flex-col w-full max-w-5xl cursor-pointer items-center  gap-4 rounded-lg bg-white shadow-lg p-4 md:px-6 md:py-4 max-xl:flex-col max-xl:gap-3">
        {
            type!=='mobile' &&
            <div className={`flex size-12 items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-300`}
        >
            <p className="text-xl font-bold text-gray-700">
                {user?.firstName[0]?.toUpperCase()}
            </p>
        </div>
        }
        <div
            className={`${
                type === 'mobile'
                    ? 'flex flex-1 flex-col justify-center'
                    : 'flex flex-1 flex-col justify-center max-xl:hidden'
            }`}
        >
            <h1 className="text-base font-semibold text-gray-700 truncate">
                {`${user?.firstName} ${user?.lastName}`}
            </h1>
            <p className="text-sm font-normal text-gray-500 truncate">{user?.email}</p>
        </div>
        <div className="relative size-6 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center">
            <Image
                onClick={handleLogout}
                src="/icons/logout.svg"
                fill
                alt="Logout"
                className="hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
        </div>
    </footer>
  )
}

export default Footer
