
import HeaderBox from '@/componets/HeaderBox'
import PaymentTransferForm from '@/componets/PayemntTransferForm'
import React from 'react'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccounts } from '@/lib/actions/bank.actions'
const PaymentTransfer = async() => {
    const loggedIn=await getLoggedInUser();
    const accounts=await getAccounts({
       userId:loggedIn.$id
    })
  return (
    <section className="flex max-h-screen w-full flex-col gap-8 bg-gray-50 p-3 md:p-8 xl:py-12">
  <HeaderBox
    title="Payment Transfer"
    subtext="Please provide any specific details or notes related to the payment"
  ></HeaderBox>
  <section className="flex w-full  flex-col gap-6 shadow-lg p-6">
    <PaymentTransferForm accounts={accounts.data}></PaymentTransferForm>
  </section>
</section>

  )
}
export default PaymentTransfer 
