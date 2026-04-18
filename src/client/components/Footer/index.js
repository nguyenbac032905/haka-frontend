import "./footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">

                {/* TOP */}
                <div className="footer__top">

                    {/* BRAND */}
                    <div className="footer__col footer__col--brand">
                        <h3 className="footer__logo">HAKA Store</h3>
                        <p className="footer__desc">
                            Chúng tôi cung cấp các sản phẩm chất lượng cao, an toàn và thân thiện với môi trường.
                            Cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
                        </p>
                        <p className="footer__desc">
                            Địa chỉ: Hà Nội, Việt Nam <br />
                            Hotline: 0123 456 789 <br />
                            Email: support@haka.vn
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="footer__col">
                        <h4 className="footer__title">Về chúng tôi</h4>
                        <ul className="footer__list">
                            <li className="footer__item">Giới thiệu</li>
                            <li className="footer__item">Tuyển dụng</li>
                            <li className="footer__item">Tin tức</li>
                            <li className="footer__item">Hệ thống cửa hàng</li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Chính sách</h4>
                        <ul className="footer__list">
                            <li className="footer__item">Chính sách bảo mật</li>
                            <li className="footer__item">Chính sách đổi trả</li>
                            <li className="footer__item">Điều khoản sử dụng</li>
                            <li className="footer__item">Hướng dẫn mua hàng</li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Hỗ trợ khách hàng</h4>
                        <ul className="footer__list">
                            <li className="footer__item">Trung tâm trợ giúp</li>
                            <li className="footer__item">Hướng dẫn thanh toán</li>
                            <li className="footer__item">Vận chuyển</li>
                            <li className="footer__item">Câu hỏi thường gặp</li>
                        </ul>
                    </div>

                    {/* NEWSLETTER */}
                    <div className="footer__col">
                        <h4 className="footer__title">Đăng ký nhận tin</h4>
                        <p className="footer__desc">
                            Nhận thông tin khuyến mãi và sản phẩm mới nhất.
                        </p>
                        <div className="footer__subscribe">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn..."
                                className="footer__input"
                            />
                            <button className="footer__button">
                                Đăng ký
                            </button>
                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2026 HAKA Store. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;