import SideBar from "@/componets/SideBar";
import Image from "next/image";
import MobileNav from "@/componets/MobileNav";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const loggedIn={
      firstName:"Gaurav",
      lastName:"sahu"
    }
    return (
      <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}></SideBar>
        <div className="w-full">
          <div className="w-full p-3 flex flex-row items-center hideMobileNav justify-between">
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