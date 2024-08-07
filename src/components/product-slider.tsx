import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../stores/product-store";

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-8">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.product_id} className="px-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
