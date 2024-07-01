import type { Metadata } from "next";
 
import { auth } from "@clerk/nextjs/server";
import Sidebar from "./_components/sidebar";

   

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
auth().protect({
  unauthenticatedUrl:"/login",
  unauthorizedUrl:"/"
})
 return (
   <>
     <div className="flex bg-gray-100 min-h-screen">
       <Sidebar />
       <main className="flex-1 p-8">{children}</main>
     </div>
   </>
 );
}
