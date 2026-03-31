import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <div className="my-4 max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10">
        <Categorys />
      </div>
      <div className="py-[45px] max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10">
        <FeatureProducts />
      </div>
      <div className="py-10">
        <div className="max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10 flex flex-wrap">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Product" />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Rated Product" />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Product" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
