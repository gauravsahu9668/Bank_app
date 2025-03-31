import HeaderBox from '@/componets/HeaderBox'
import React from 'react'
import { getLoggedInUser} from '@/lib/actions/user.actions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import formatAmount from '@/lib/utitls'
import Transactions from '@/componets/Transaction'
const TransactionHistory = async({searchParams:{id,page}}:SearchParamProps)=>{
  const currentPage=Number(page as string || 1)
    const loggedIn=await getLoggedInUser();
      const accounts=await getAccounts({
         userId:loggedIn.$id
      })
      if(!accounts) return 
      console.log(accounts) 
      const appwriteItemId=(id as string || accounts?.data[0].appwriteItemId);
      const account=await getAccount({appwriteItemId})
  return (
<section className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-50 p-6 md:p-8 xl:py-12">
  <div className="flex w-full max-w-5xl mx-auto flex-col items-start justify-between gap-8">
    <HeaderBox
      title="Transaction History"
      subtext="See your bank details and transaction"
    ></HeaderBox>
    <div className="space-y-6 w-full">
      <div className="flex w-full flex-col justify-between gap-4 rounded-lg border bg-blue-600 px-4 py-5 shadow-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white">
            {accounts?.data[0].name}
          </h2>
          <p className="text-sm text-blue-200">
            {accounts?.data[0].officialName}
          </p>
          <p className="text-sm font-semibold tracking-wider text-white">
            ●●●● ●●●● ●●●● {accounts?.data[0].mask}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-md bg-[#60a4fc] px-4 py-2 text-white">
          <p className="text-sm">Current Balance</p>
          <p className="text-2xl text-center font-bold">
            {formatAmount(accounts?.data[0]?.currentBalance)}
          </p>
        </div>
      </div>
      <section className="flex w-full flex-col gap-6">
        <Transactions
          page={currentPage}
          transactions={account?.allTransactions}
        ></Transactions>
      </section>
    </div>
  </div>
</section>

  )
}

export default TransactionHistory
