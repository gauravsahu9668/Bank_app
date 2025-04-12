import React from 'react'
import { getWalletBalance } from '@/lib/actions/wallet.transactions'
import formatAmount from '@/lib/utitls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Deposite from '@/componets/Deposite';
import OnRampTransactions from '@/componets/OnRampTransactions';
const page = async() => {
  const walletUser=await getWalletBalance()
  return (
    // <div>
    //   <div>
    //     <h1>Horizon Wallet</h1>
    //     <h1>Current Balance</h1>
    //     <p>
    //       {
    //         formatAmount(walletUser?.amount || 0)
    //       }
    //     </p>
    //   </div>
    //   <div>
    //   <Tabs defaultValue="account" className="w-[400px]">
    //          <TabsList>
    //          <TabsTrigger value="account">Deposite</TabsTrigger>
    //          <TabsTrigger value="password">Withdraw</TabsTrigger>
    //          </TabsList>
    //          <TabsContent value="account">
    //              <Deposite type="deposite" currentBalance={30} inputTitle="Amount to Deposite"  buttonTitle="Deposite"></Deposite>
    //          </TabsContent>
    //          <TabsContent value="password">
    //             <Deposite type="withdraw" currentBalance={30} inputTitle='Amount to Withdraw' buttonTitle='Withdraw'></Deposite>
    //          </TabsContent>
    //   </Tabs>
    //   </div>
    //   <OnRampTransactions></OnRampTransactions>
    // </div>
    <div className="flex w-full flex-col  min-h-screen bg-gray-100 p-6">
      <div className="mt-6 bg-white shadow-lg flex changeBox rounded-2xl p-6 w-full ">
            <Tabs defaultValue="account" className="w-[70%]">
      <TabsList className="flex justify-center gap-4 bg-gray-200 p-2 rounded-lg">
        <TabsTrigger value="account" className="px-4 py-2 text-lg font-medium text-gray-700 rounded-lg transition hover:bg-gray-300 focus:outline-none">
          Deposite
        </TabsTrigger>
        <TabsTrigger value="password" className="px-4 py-2 text-lg font-medium text-gray-700 rounded-lg transition hover:bg-gray-300 focus:outline-none">
          Withdraw
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <Deposite type="deposite" currentBalance={30} inputTitle="Amount to Deposite" buttonTitle="Deposite" />
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <Deposite type="withdraw" currentBalance={30} inputTitle="Amount to Withdraw" buttonTitle="Withdraw" />
      </TabsContent>
            </Tabs>
            <div className=" p-6 w-[30%] flex flex-col changeWallet items-start">
               <h1 className="text-3xl font-bold text-gray-800 mb-2">Horizon Wallet</h1>
               <div className='flex flex-col  items-start'>
    <h2 className="text-xl font-semibold text-gray-600">Current Balance</h2>
    <p className="text-2xl font-semibold text-green-600 mt-2">
      {formatAmount(walletUser?.amount || 0)}
    </p>
               </div>
            </div>
       </div>
      <div className="mt-6 w-full">
      <OnRampTransactions />
      </div>
   </div>

  )
}
export default page

