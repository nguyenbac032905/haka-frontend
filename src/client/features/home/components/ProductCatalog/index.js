import { useMemo, useState } from "react";
import { useCategories } from "../../../category/hooks/useCategories";
import { useProducts } from "../../../product/hooks/useProducts";
import { Spin, Row, Col, Card, Pagination, Select, Tag } from "antd";
import "./productCatalog.scss";
import {Link} from "react-router-dom";

const { Option } = Select;

function ProductCatalog() {
  const { categories, loading: loadingCategory } = useCategories();
  const { products, loading: loadingProduct } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);

  const pageSize = 4;

  const filteredProducts = useMemo(() => {
    const activeCategoryIds = new Set(
      (categories || []).map((c) => c.id)
    );

    let result = (products || []).filter((p) =>
      activeCategoryIds.has(p.product_category_id)
    );

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [categories, products, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  if (loadingCategory || loadingProduct)
    return (
      <div className="catalog__loading">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="catalog">
      <div className="catalog__header">
        <h2 className="catalog__title">Product Catalog</h2>
        <Select
          placeholder="Sắp xếp giá"
          className="catalog__sort"
          onChange={(value) => {
            setSortOrder(value);
            setCurrentPage(1);
          }}
          allowClear
        >
          <Option value="asc">Giá tăng dần</Option>
          <Option value="desc">Giá giảm dần</Option>
        </Select>
      </div>

      <Row gutter={[20, 20]}>
        {paginatedProducts.map((item) => {
          const oldPrice = Math.round(item.price / (1 - item.discountPercentage / 100));

          return (
            <Col span={6} key={item.id}>
                <Link to={`product/${item.slug}`}>
                        <Card hoverable className="product-card">
                        <div className="product-card__image">
                        <img src={item.thumbnail} alt={item.title} />

                        {/* 🔥 Discount badge */}
                        {item.discountPercentage > 0 && (
                            <div className="product-card__discount">
                            -{item.discountPercentage}%
                            </div>
                        )}
                        </div>

                        <div className="product-card__info">
                        <h3 className="product-card__title">{item.title}</h3>

                        <div className="product-card__price-group">
                            <span className="product-card__price">
                            {item.price.toLocaleString()}đ
                            </span>

                            {item.discountPercentage > 0 && (
                            <span className="product-card__old-price">
                                {oldPrice.toLocaleString()}đ
                            </span>
                            )}
                        </div>
                        </div>
                    </Card>
                </Link>
            </Col>
          );
        })}
      </Row>

      <div className="catalog__pagination">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProducts.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default ProductCatalog;