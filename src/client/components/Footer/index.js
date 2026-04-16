import "./footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">

                {/* TOP */}
                <div className="footer__top">
                    <div className="footer__col">
                        <h4 className="footer__title">Về chúng tôi</h4>
                        <p className="footer__text">
                            Chuyên cung cấp sản phẩm chất lượng cao với giá tốt nhất.
                        </p>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Liên kết</h4>
                        <ul className="footer__list">
                            <li className="footer__item">Trang chủ</li>
                            <li className="footer__item">Sản phẩm</li>
                            <li className="footer__item">Liên hệ</li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Hỗ trợ</h4>
                        <ul className="footer__list">
                            <li className="footer__item">Chính sách</li>
                            <li className="footer__item">Bảo mật</li>
                            <li className="footer__item">Điều khoản</li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Liên hệ</h4>
                        <ul className="footer__list">
                            <li className="footer__item">Email: support@gmail.com</li>
                            <li className="footer__item">Phone: 0123 456 789</li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2026 - All rights reserved
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;