 
import { Alfa_Slab_One } from "next/font/google";
 import ProductHighlight from '@/components/layout/highlight';
 import Main from '@/components/layout/main';
import Map from "@/components/layout/map/map";
 
    
const alfa_Slab_One = Alfa_Slab_One({weight:[ '400'],subsets:['latin']})

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return (
    <div>
      <Main />
 
      <ProductHighlight />
      <Map />

 
    </div>
  );
}
