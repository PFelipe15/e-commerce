import Filter from "@/components/layout/filter";
import { fetchAllProducts } from "../actions";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import Header from "@/components/layout/header";

 export default async function Products() {
  const { formatedProducts } = await fetchAllProducts({});
  return (
    <> 
      <Header/>
    <div
      className="container  mt-5 gap-4 flex items-center justify-center flex-col "
      id="collections"
    >
       <Filter />

      <div>
        <h1 className="font-bold text-2xl text-primary ">Nossas Coleções</h1>
        <section className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          <InfiniteScroll initialProducts={formatedProducts} />
        </section>
      </div>
    </div>
    
    </>
  );
}
