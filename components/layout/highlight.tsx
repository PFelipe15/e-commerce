 
 import {ProductListHighlight }from "@/components/shop/product-list";
 import Link from "next/link";
 
 export default function ProductHighlight() {
   return (
     <div
       className="container mt-5 gap-4 flex items-center justify-center flex-col "
       id="collections"
     >
       <h1 className="font-bold text-2xl text-primary ">Destaques</h1>
       <ProductListHighlight />
     </div>
   );
 }
 