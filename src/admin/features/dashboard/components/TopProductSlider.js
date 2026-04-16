import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Keyboard } from "swiper/modules";

import { useProducts } from "../hooks/useProducts";
import "./TopProductSlider.scss";
import { Card } from "antd";

function TopProductSlider() {
  const { products = [] } = useProducts();

  const topProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 10);

  return (
    <Card title="Top 10 sản phẩm bán chạy nhất">
      <Swiper
          slidesPerView={3}
          spaceBetween={20}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="mySwiper"
      >
        {topProducts.map(p => (
          <SwiperSlide key={p.id}>
            <div className="product-card">
              <div className="product-image">
                <img src={p.thumbnail} alt={p.title} />
              </div>
              <h4 className="product-title">{p.title}</h4>
              <div className="product-number">
                  <p>Đã bán: {p.sold || 0}</p>
                  <p>Còn lại: {p.stock || 0}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
}

export default TopProductSlider;