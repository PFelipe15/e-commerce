
import ProductHighlight from "@/components/layout/highlight";
import Main from "@/components/layout/main";
import Map from "@/components/layout/map/map";
import { ProductList } from "@/components/shop/product-list";
import AboutUs from "@/components/layout/about-us";
  import ReturnPolicy from "@/components/layout/return-policy";
import Promotions from "@/components/layout/promotions";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div>
  <Header  />
      <Main />
      <div id='Promotions' className="container mx-auto px-4 ">
        <Promotions />
      </div>
      <div className="container mx-auto px-4">
        <ProductHighlight />
        <ProductList />
      </div>

      <AboutUs />

      <div className="container mx-auto px-4">
         <ReturnPolicy />
      </div>
      <div className="container mx-auto px-4">
        <Map />
      </div>
      <Footer />
    </div>
  );
}
