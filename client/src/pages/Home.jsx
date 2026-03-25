import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <div className="my-4 max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10">
        <Categorys />
      </div>
    </div>
  );
};

export default Home;
