import { Button, Form, Input } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import { useNotification } from "../../../../shared/hooks/useNotification";
import "./formLogin.scss";

function FormLogin() {
    const { redirect } = useRedirect();
    const { success, error } = useNotification();
    const { login, loading } = useAuth();

    const onFinish = async (values) => {
        const result = await login(values);

        if (result?.success) {
            success("Đăng nhập thành công");
            redirect("/");
        } else {
            error("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
        }
    };

    return (
       <>
            <div class="login">
                <div class="login_box">
                    <div class="login_box-left">

                        <div class="login_box-content">

                            <div class="login_box-logos">
                                <img src="https://cdn-static.smember.com.vn/_next/static/media/cellphones-long-icon.6a80e2a6.svg" alt="" />
                                <img src="https://cdn-static.smember.com.vn/_next/static/media/dtv-long-icon.40a11e1d.svg" alt="" />
                            </div>

                            <div class="login_box-text">
                                Nhập hội khách hàng thành viên <strong style={{color:"#d70018"}}>HMEMBER</strong>
                            </div>

                            <div class="login_box-text">
                                Để không bỏ lỡ các ưu đãi hấp dẫn từ HAKA
                            </div>

                        </div>

                        <div class="login_box-card">

                            <div class="cornor bottom-left"></div>
                            <div class="cornor bottom-right"></div>
                            <div class="cornor top-left"></div>
                            <div class="cornor top-right"></div>

                            <div class="login_box-list">
                                <ul>
                                    <li>
                                        <i class="fa-solid fa-gift"></i>
                                        <div><strong>Chiết khấu đến 5%</strong> khi mua các sản phẩm mua tại HAKA</div>
                                    </li>

                                    <li>
                                        <i class="fa-solid fa-gift"></i>
                                        <div><strong>Miễn phí giao hàng</strong> cho thành viên SMEM, SVIP và cho đơn hàng từ 300.000đ</div>
                                    </li>

                                    <li>
                                        <i class="fa-solid fa-gift"></i>
                                        <div><strong>Tặng voucher sinh nhật đến 500.000đ</strong> cho khách hàng thành viên</div>
                                    </li>

                                    <li>
                                        <i class="fa-solid fa-gift"></i>
                                        <div>Trợ giá thu cũ lên đời <strong>đến 1 triệu</strong></div>
                                    </li>

                                    <li>
                                        <i class="fa-solid fa-gift"></i>
                                        <div>Thăng hạng nhận voucher <strong>đến 300.000đ</strong></div>
                                    </li>

                                    <li>
                                        <i class="fa-solid fa-gift"></i>
                                        <div>Đặc quyền S-Student/S-Teacher <strong>ưu đãi thêm đến 10%</strong></div>
                                    </li>
                                </ul>

                                <a href="/">Xem chi tiết chính sách ưu đãi Hmember</a>
                            </div>

                        </div>

                    </div>
                    <div class="login_box-right">

                        <div class="box-head">
                            <h2>Đăng nhập HMEMBER</h2>
                        </div>

                        <form action="/user/login" method="POST">

                            <div class="form-group login_box-item">
                                <div class="type">Email:</div>
                                <input type="email" name="email" required placeholder="Nhập Email của bạn..." />
                            </div>

                            <div class="form-group login_box-item">
                                <div class="type">Mật khẩu:</div>
                                <input type="password" name="password" required placeholder="Nhập mật khẩu của bạn..." />
                            </div>

                            <div class="form-group login_box-button">
                                <button type="submit" class="btn btn-red">Đăng nhập</button>
                            </div>

                        </form>

                        <div class="login_box-forgot">
                            <a href="/user/password/forgot">Quên mật khẩu?</a>
                        </div>

                        <div class="login_box-register">
                            <span>Bạn chưa có tài khoản ?</span>
                            <a href="/user/register">Đăng ký ngay</a>
                        </div>
                    </div>

                </div>

            </div>
       </>
    );
}

export default FormLogin;