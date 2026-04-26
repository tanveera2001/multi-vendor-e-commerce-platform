import cartManager from "../../observer/CartManager";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../Ratings";
import { useSelector } from "react-redux";

const demoProducts = [
  {
    _id: "69edc928b485550a1445cbfa",
    name: "Jersey",
    price: 25,
    img: "/images/products/1.webp",
    discount: 5,
  },
  {
    _id: "69edc928b485550a1445cbfb",
    name: "Headphone",
    price: 50,
    img: "/images/products/2.webp",
    discount: 10,
  },
  {
    _id: "69edc928b485550a1445cbfc",
    name: "Bag",
    price: 30,
    img: "/images/products/3.webp",
    discount: 7,
  },
  {
    _id: "69edc928b485550a1445cbfd",
    name: "Shirt",
    price: 20,
    img: "/images/products/4.webp",
    discount: 5,
  },
  {
    _id: "69edc928b485550a1445cbfe",
    name: "Panjabi",
    price: 35,
    img: "/images/products/5.webp",
    discount: 6,
  },
  {
    _id: "69edc928b485550a1445cbff",
    name: "T-shirt",
    price: 15,
    img: "/images/products/6.webp",
    discount: 4,
  },
  {
    _id: "69edc928b485550a1445cc00",
    name: "Umbrella",
    price: 10,
    img: "/images/products/7.webp",
    discount: 3,
  },
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
      {/* Title */}
      <div className="w-full text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold pb-[45px]">
        <h2>Feature Products</h2>
        <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>

      {/* Products grid */}
      <div className="w-full grid grid-cols-5 md-lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {demoProducts.map((p) => (
          <div
            key={p._id}
            className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              {/* Discount */}
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                {p.discount}%
              </div>

              {/* Product Image */}
              <img
                className="sm:w-full w-full aspect-square object-cover"
                src={p.img}
                alt={p.name}
              />

              {/* Hover actions */}
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

            {/* Product info */}
            <div className="py-3 text-gray-700 px-2">
              <h2 className="font-medium">{p.name}</h2>

              <div className="flex justify-start items-center gap-3">
                <span className="text-lg font-bold">${p.price}</span>

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
