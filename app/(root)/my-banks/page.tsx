import React from 'react'
import HeaderBox from '@/componets/HeaderBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccounts } from '@/lib/actions/bank.actions';
import BankCard from '@/componets/BankCard';
const MyBanks = async() => {
    const loggedIn=await getLoggedInUser();
    const accounts=await getAccounts({
       userId:loggedIn.$id
    })
  return (
       <section className='flex'>
           <div className='flex h-screen max-h-screen w-full flex-col gap-8 bg-gray-25 p-8 xl:py-12'>
            <HeaderBox title="My Bank Accounts" subtext="Effortlessly manage your banking activites">
            </HeaderBox>
            <div className='space-y-4'>
               <h2 className='text-18 font-semibold text-gray-900'>
                Your Cards
               </h2>
               <div className='flex flex-wrap gap-6'>
                {
                  accounts && accounts.data.map((account:Account)=>{
                    return (
                      <BankCard key={accounts.id} account={account} userName={loggedIn.firstName}>
                      </BankCard>
                    )
                  })
                }
               </div>
            </div>
           </div>
        </section>
  )
}

export default MyBanks
