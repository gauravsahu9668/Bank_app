import React from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './bankItemTab'
import BankInfo from './BankInfo'
import Transactions from './Transaction'
const Recenttransaction = ({accounts,transactions,appwriteItemId,page}:RecentTransactionsProps) => {
  return (
    <div>
       <section className='flex w-full flex-col gap-6'>
        <header className='flex items-center justify-between'>
            <h2 className='text-20 md:text-24 font-semibold text-gray-900'>
                Recent transactions
            </h2>
            <Link href={`/transaction-history/?id=${appwriteItemId}`} 
            className="text-14 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700">
                View all
            </Link>
        </header>
        <Tabs defaultValue={appwriteItemId} className="w-full">
          <TabsList className='custom-scrollbar mb-8 flex w-full flex-nowrap'>
                {
                    accounts.map((account)=>{
                        return (
                            <TabsTrigger key={account.id} value={account.appwriteItemId}>
                                <BankTabItem key={account.id} account={account} appwriteItemId={appwriteItemId}>
                                </BankTabItem>
                            </TabsTrigger>
                        )
                    })
                }
          </TabsList>
          {
            accounts.map((account:Account)=>{
                return (
                    <TabsContent value={account.appwriteItemId} key={account.id}
                    className='space-y-4'>
                        <BankInfo account={account} appwriteItemId={appwriteItemId} type='full'>
                        </BankInfo>
                        <Transactions page={page} transactions={transactions}></Transactions>
                    </TabsContent>
                )
            })
          }
        </Tabs>
       </section>
    </div>
  )
}

export default Recenttransaction
