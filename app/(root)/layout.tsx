
import SideBar from "@/componets/SideBar";
import Image from "next/image";
import MobileNav from "@/componets/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) { 
    const loggedIn=await getLoggedInUser();
    if(!loggedIn) redirect('/sign-in')
    return (
      <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}></SideBar>
        <div className="w-full">
          <div className="w-full p-3 flex bg-[#eae8e8] flex-row items-center hideMobileNav justify-between">
            <Image src='/icons/logo.svg' width={30} height={30} alt='logo'></Image>
            <div>
                <MobileNav user={loggedIn}></MobileNav>
            </div>
          </div>
          {   
          children
          }
        </div>
    </main>
    );
  }