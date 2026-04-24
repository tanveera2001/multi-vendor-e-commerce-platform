import { useEffect, useState } from "react";
import cartManager from "../observer/CartManager";
import CartObserver from "../observer/CartObserver";

import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Headers from "../components/Header";
import Footer from "../components/Footer";

const Card = () => {
  const [card_products, setCardProducts] = useState([]);
  const [outOfStockProduct, setOutOfStockProduct] = useState([]);

  useEffect(() => {
    const observer = new CartObserver((cartData) => {
      const data = cartData || [];

      setCardProducts(data);

      const outStock = data.filter((item) =>
        item.products?.some((p) => p.productInfo.stock < p.quantity),
      );

      setOutOfStockProduct(outStock);
    });

    cartManager.subscribe(observer);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      cartManager.loadCart(userInfo.id, userInfo.token);
    }

    return () => {
      cartManager.unsubscribe(observer);
    };
  }, []);

  return (
    <div>
      <Headers />

      <div className="max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10">
        <section
          style={{ backgroundImage: 'url("/images/banner/card.jpg")' }}
          className="h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left"
        >
          <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
            <div className="w-full h-full mx-auto">
              <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
                <h2 className="text-3xl font-bold">Shop.my</h2>
                <div className="flex justify-center items-center gap-2 text-2xl w-full">
                  <Link to="/">Home</Link>
                  <span className="pt-2">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                  <span>Card</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10 py-16">
          {card_products.length > 0 || outOfStockProduct.length > 0 ? (
            <div className="flex flex-wrap">
              {/* LEFT SIDE */}
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    {/* STORE COUNT */}
                    <div className="bg-white py-4">
                      <h2 className="text-green-500 text-xl font-semibold">
                        Store {card_products.length}
                      </h2>
                    </div>

                    {/* CART PRODUCTS */}
                    {card_products.map((p, i) => (
                      <div
                        key={i}
                        className="flex bg-white p-4 flex-col gap-2 border"
                      >
                        {/* SHOP NAME */}
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600">
                            {p.shopName}
                          </h2>
                        </div>

                        {/* PRODUCTS */}
                        {p.products?.map((item, j) => (
                          <div key={j} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={item.productInfo.images?.[0]}
                                  alt="product"
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md">
                                    {item.productInfo.name}
                                  </h2>
                                  <span className="text-sm">
                                    Brand : {item.productInfo.brand}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  ${item.productInfo.price}
                                </h2>
                                {item.productInfo.discount > 0 && (
                                  <>
                                    <p className="line-through">
                                      ${item.productInfo.price}
                                    </p>
                                    <p>-{item.productInfo.discount}%</p>
                                  </>
                                )}
                              </div>

                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div className="px-3 cursor-pointer">-</div>
                                  <div className="px-3">{item.quantity}</div>
                                  <div className="px-3 cursor-pointer">+</div>
                                </div>

                                <button className="px-5 py-[3px] bg-red-500 text-white">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* OUT OF STOCK */}
                    {outOfStockProduct.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4">
                          <h2 className="text-red-500 font-semibold">
                            Out of Stock {outOfStockProduct.length}
                          </h2>
                        </div>

                        <div className="bg-white p-4">
                          {outOfStockProduct.map((p) =>
                            p.products?.map((item, j) => (
                              <div
                                key={j}
                                className="w-full flex flex-wrap mb-3"
                              >
                                <div className="flex gap-2 w-7/12">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={item.productInfo.images?.[0]}
                                    alt=""
                                  />
                                  <div>
                                    <h2>{item.productInfo.name}</h2>
                                  </div>
                                </div>

                                <div className="w-5/12 flex justify-end">
                                  <span className="text-red-500">
                                    Out of stock
                                  </span>
                                </div>
                              </div>
                            )),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3 border">
                      <h2 className="text-xl font-bold">Order Summary</h2>

                      <div className="flex justify-between">
                        <span>Total Items</span>
                        <span>
                          {card_products.reduce(
                            (acc, shop) =>
                              acc +
                              shop.products.reduce(
                                (sum, item) => sum + item.quantity,
                                0,
                              ),
                            0,
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span>$85</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="text-lg text-orange-500">
                          $
                          {card_products.reduce(
                            (acc, shop) => acc + shop.price,
                            0,
                          )}
                        </span>
                      </div>

                      <button className="px-5 py-[6px] bg-orange-500 text-white uppercase">
                        Proceed to checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shops">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Card;
