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
      setProducts((prevProducts) => [...prevProducts, ...formatedProducts]);
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
        <ProductCard key={product.id} isHighlight={false} {...product}></ProductCard>
      ))}
      {hasMore && <div ref={ref}>carregando mais registros...</div>}
    </>
  );
}

export default InfiniteScroll;
