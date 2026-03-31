import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ButtonGroup = ({ next, previous, title }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg font-bold text-slate-600">{title}</div>
      <div className="flex justify-center items-center gap-3 text-slate-600">
        <button
          onClick={() => previous()}
          className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
        >
          <span>
            <FiChevronLeft />
          </span>
        </button>
        <button
          onClick={() => next()}
          className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
        >
          <span>
            <FiChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
};

const Products = ({ title }) => {
  const products = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup title={title} />}
      >
        {products.map((p, i) => {
          return (
            <div key={i} className="flex flex-col justify-start gap-2 ">
              {p.map((pl, j) => (
                <Link
                  key={j}
                  className="flex justify-start items-center"
                  to="#"
                >
                  <img
                    className="w-[80px] h-[80px]"
                    src={`http://localhost:5173/images/products/${pl}.webp`}
                    alt="images"
                  />
                  <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                    <h2 className="text-[13px] text-gray-800">
                      Long Sleeve casual Shirt for Man
                    </h2>
                    <span className="text-md font-bold text-gray-800">
                      $565
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Products;
