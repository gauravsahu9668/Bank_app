import React from 'react'
import HeaderBox from '@/componets/HeaderBox'
import TotalbalanceBox from '@/componets/TotalbalanceBox';
import DoughtNutChart from '@/componets/DoughtNutChart';
import RightSideBar from '@/componets/RightSideBar';
const Home = () => {
  const loggedIn= {firstName :"Gaurav",lastName:"Sahu",email:"sahug6194@gmail.com"};
  return (
    <section className=' flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll'>
      <div className=' flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll'>
        <header className='flex flex-col justify-between gap-8'>
          <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstname || "Guest"}
          subtext="Access and manage your account and transaction efficiently"
          >
          </HeaderBox>
          <TotalbalanceBox
          accounts={[]}
          totalBanks={10}
          totalCurrentBalance={1235.35}
          >
          </TotalbalanceBox>
        </header>
        RecentTrsactions
      </div>
        <RightSideBar
         user={loggedIn}
         transactions={[]}
         banks={[{currentBalance:123.50},{currentBalance:500.50}]}
         ></RightSideBar>
    </section>
  )
}

export default Home
