import Image from "next/image";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full no-scrollbar justify-between font-inter">
         {
          children
         }
         <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-[#e5e9ec] max-lg:hidden">
           <div>
              <Image src="/icons/auth-image.svg"
              width={500}
              height={500}
              alt="SignIn page">
              </Image>
           </div>
         </div>
      </main>
    );
  }