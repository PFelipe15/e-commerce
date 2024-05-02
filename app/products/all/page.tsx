 
  
 import { ProductList } from "@/components/shop/product-list";
import Link from "next/link";

export default function Products() {
  return (
    <div
      className="container  mt-5 gap-4 flex items-center justify-center flex-col "
      id="collections"
    >
      <h1 className="font-bold text-2xl text-primary ">Nossas Coleções</h1>
      <ProductList />

      <Link href={"/products/all"}>
        <span>Ver Todos</span>
      </Link>
    </div>
  );
}
