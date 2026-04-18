import { Button, Form, Input } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import { useNotification } from "../../../../shared/hooks/useNotification";
import "./formLogin.scss";
import { login } from "../authSlice";
import { useDispatch,useSelector } from "react-redux";
import { setCookie } from "../../../../shared/helpers/cookie";
import { Link } from "react-router-dom";
import { getCartByUserId ,createCart} from "../../cart/api/cartService";
import { useEffect } from "react";

function FormLogin() {
    const { redirect } = useRedirect();
    const { success, error } = useNotification();
    const {loading,user, error: errorLogin} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            const res = await dispatch(login(values)).unwrap();
            if(res && res.length > 0) {
                success("Đăng nhập thành công");
                setCookie("tokenUser", res[0].tokenUser);
                setCookie("emailUser", res[0].email);
                setCookie("userId", res[0].id);
                redirect("/");
            }else{
                error("Sai email hoặc mật khẩu");
            }
        } catch (err) {
            error(err)
        }
    };
    useEffect(() => {
        const fetchApi = async () => {
            if(user && user.length > 0) {
                const cart = await getCartByUserId(user[0].id);
                if(cart && cart.length > 0){
                    setCookie("cartId",cart[0].id);
                }else{
                    const result = await createCart({user_id: user[0].id});
                    if( result && result.length > 0){
                        setCookie("cartId",result[0].id);
                    }
                }
            }
        }
        fetchApi();
    },[user]);
    return (
        <div className="login">
            <div className="login__wrapper">

                <div className="login__card">
                    <h2 className="login__title">Đăng nhập</h2>
                    <p className="login__subtitle">
                        Chào mừng bạn quay trở lại!
                    </p>

                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        className="login__form"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email" },
                                { type: "email", message: "Email không hợp lệ" }
                            ]}
                        >
                            <Input size="large" placeholder="Nhập email..." />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu" }
                            ]}
                        >
                            <Input.Password size="large" placeholder="Nhập mật khẩu..." />
                        </Form.Item>

                        <div className="login__options">
                            <Link to="/password/forgot">Quên mật khẩu?</Link>
                        </div>

                        <Button
                            htmlType="submit"
                            size="large"
                            block
                            className="login__btn"
                        >
                            Đăng nhập
                        </Button>
                    </Form>

                    <div className="login__register">
                        <span>Bạn chưa có tài khoản?</span>
                        <Link to="/register">Đăng ký</Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FormLogin;