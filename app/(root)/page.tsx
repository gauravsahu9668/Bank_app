import React from 'react'
import HeaderBox from '@/componets/HeaderBox'
import TotalbalanceBox from '@/componets/TotalbalanceBox';
import DoughtNutChart from '@/componets/DoughtNutChart';
import RightSideBar from '@/componets/RightSideBar';
import { getLoggedInUser, getUserInfo } from '@/lib/actions/user.actions';
import { getAccount,getAccounts } from '@/lib/actions/bank.actions';
import Recenttransaction from '@/componets/Recenttransaction';

const Home = async({searchParams:{id,page}}:SearchParamProps) => {
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
    <section className=' flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll'>
      <div className=' flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll'>
        <header className='flex flex-col justify-between gap-8'>
          <HeaderBox
          type="greeting"
          title="Welcome"
          user={`${loggedIn.firstName} ${loggedIn?.lastName}` || "Guest"}
          subtext="Access and manage your account and transaction efficiently"
          >
          </HeaderBox>
          <TotalbalanceBox
          accounts={accounts?.data}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
          >
          </TotalbalanceBox>
        </header>
       <Recenttransaction accounts={accounts.data}
       transactions={account?.allTransactions}
       appwriteItemId={appwriteItemId}  page={currentPage} >
       </Recenttransaction>
      </div>
        <RightSideBar
         user={loggedIn}
         transactions={account?.allTransactions}
         banks={accounts.data}
         ></RightSideBar>
    </section>
  )
}

export default Home
