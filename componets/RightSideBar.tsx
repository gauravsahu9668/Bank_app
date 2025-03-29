import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BankCard from './BankCard'
const RightSideBar = ({user,transactions,banks}:RightSidebarProps) => {
  return (
    <aside className='min-w-[330px] hideRightBar'>
        <section className='flex flex-col pb-8'>
            <div className='h-[150px] w-full bg-gradient-mesh bg-cover bg-no-repeat'></div>
            <div className='relative flex px-6 justify-center'>
                <div className='flex . items-center justify-center absolute left-3 -top-5  w-[60px] h-[60px] rounded-full bg-gray-100 border-8 border-white p-2 '>
                 <span className="text-5xl font-bold text-blue-500">{user.firstName[0]}</span>
                </div>
                <div className='flex flex-col pt-24'>
                    <h1 className='text-24 font-semibold text-gray-900'>
                        {user.firstName}
                        {user.lastName}
                    </h1>
                    <p className='text-16 font-normal text-gray-600'>
                        {user.email}
                    </p>
                </div>
            </div>
        </section>
        <section className='flex flex-col justify-between gap-8 px-6 py-8'>
            <div className='flex w-full justify-between'>
                <h2 className='header-2'>
                    My banks
                </h2>
                <Link href="/connect-Bank" className="flex gap-2">
                  <Image src='/icons/plus.svg' width={20} height={20} alt="plus"></Image>
                  <h2 className='text-14 font-semibold text-gray-600'>
                    Add Bank
                  </h2>
                </Link>
            </div>
            {banks?.length>0 && (
                <div className='relative flex flex-1 flex-col items-center justify-center gap-5 '>
                    <div className='relative z-10'>
                       <BankCard 
                       key={banks[0].$id}
                       account={banks[0]}
                       userName={`${user.firstName} ${user.lastName}`}
                       showBalance={false}></BankCard>
                    </div>
                    {banks[1] && (
                        <div className='absolute right-0 top-8 z-0 w-[90%]'>
                           <BankCard 
                       key={banks[1].$id}
                       account={banks[1]}
                       userName={`${user.firstName} ${user.lastName}`}
                       showBalance={false}></BankCard>
                        </div>
                    )}
                </div>
            )}
        </section>
    </aside>
  )
}

export default RightSideBar
