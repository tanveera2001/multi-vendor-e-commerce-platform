import cartManager from "../../observer/CartManager";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../Ratings";
import { useSelector } from "react-redux";

const demoProducts = [
  { _id: "661a1b2c3d4e5f0000000001", name: "Shirt", price: 675, img: 1 },
  { _id: "661a1b2c3d4e5f0000000002", name: "T-Shirt", price: 500, img: 2 },
  { _id: "661a1b2c3d4e5f0000000003", name: "Jeans", price: 900, img: 3 },
  { _id: "661a1b2c3d4e5f0000000004", name: "Polo", price: 700, img: 4 },
];

const FeatureProducts = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const add_card = async (productId) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    await cartManager.addToCart({
      userId: userInfo.id,
      productId,
      quantity: 1,
    });
  };
  return (
    <div className="w-full flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-5 md-lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {demoProducts.map((p) => (
          <div
            key={p._id}
            className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                6%
              </div>
              <img
                className="sm:w-full w-full aspect-square"
                src={`http://localhost:5173/images/products/${p.img}.webp`}
                alt="product image"
              />
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                  <AiFillHeart />
                </li>
                <Link
                  to="#"
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li
                  onClick={() => add_card(p._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiOutlineShoppingCart />
                </li>
              </ul>
            </div>
            <div className="py-3 text-gray-700 px-2">
              <h2>Long Sleeve Casual Shirt For Man</h2>
              <div className="flex justify-start items-center gap-3">
                <span className="text-lg  font-bold">$675</span>
                <div className="flex">
                  <Ratings ratings={4.5} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
