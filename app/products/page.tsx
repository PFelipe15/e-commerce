import ProductList from "@/components/shop/product-list";

export default function Products() {
    return (
      <div className="container mt-5  flex items-center justify-center flex-col " id='collections'>
        <h1 className="font-bold text-2xl text-primary">Em Destaque</h1>
        <ProductList />
      </div>
    );
}