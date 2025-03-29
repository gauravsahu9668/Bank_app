import React from 'react'
import formatAmount from '@/lib/utitls'
import AnimatedCounter from './AnimatedCounter'
import DoughtNutChart from './DoughtNutChart'
const TotalbalanceBox = ({accounts=[],totalBanks, totalCurrentBalance}:TotalBalanceBoxProps) => {
  return (
   <section className='flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6'>
     <div className='flex size-full max-w-[100px] items-center sm:max-w-[120px]'>
       <DoughtNutChart accounts={[]}></DoughtNutChart>
     </div>
     <div className='flex flex-col gap-6'>
        <h2 className='header-2'>
            Bank Accounts:{totalBanks}
        </h2>
        <div className='flex flex-col gap-2'>
          <p className='total-balance-label'>
            Total current Balance
          </p>
          
          <AnimatedCounter amount={totalCurrentBalance}></AnimatedCounter>
        </div>
     </div>
   </section>
  )
}

export default TotalbalanceBox
