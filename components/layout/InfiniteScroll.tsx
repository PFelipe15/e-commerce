"use client";
import { Product } from "@/types";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../shop/product-card";
import { useInView } from "react-intersection-observer";
import { fetchAllProducts } from "@/app/products/actions";

function InfiniteScroll({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const lastProductId = products[products.length - 1]?.id;

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true);
    const { formatedProducts, has_more } = await fetchAllProducts({
      lastProductId,
    });

    if (formatedProducts) {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...formatedProducts.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat(product.price), // Convert price to number
          currency: product.currency,
          images: product.images,
          image: product.image,
        })),
      ]);
      setHasMore(has_more);
    }

    setIsLoading(false);
  }, [lastProductId]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts();
    }
  }, [hasMore, inView, isLoading, loadMoreProducts]);

  if (!products) return <div>carregando...</div>;

  return (
    <>
      {products.map((product) => (
         <ProductCard
         key={product.id}
         isHighlight={false}
         {...product}
         description={product.description || ""}
         price={typeof product.price === 'number' ? product.price.toString() : product.price}
       />
      ))}
      {hasMore && <div ref={ref}>carregando mais registros...</div>}
    </>
  );
}

export default InfiniteScroll;
