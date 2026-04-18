import { Button, Form, Input } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import { useNotification } from "../../../../shared/hooks/useNotification";
import { useAuth } from "../hooks/useAuth";
import "./formRegister.scss";
import { Link } from "react-router-dom";
import { checkExistEmail } from "../api/authService";

function FormRegister() {
    const { redirect } = useRedirect();
    const { success, error } = useNotification();
    const {register, loading} = useAuth();

    const onFinish = async (values) => {
        const checkExist = await checkExistEmail(values.email);
        if(checkExist && checkExist.length > 0){
            error("Email đã tồn tại")
            return;
        }
        const result = await register(values);
        if(result.success){
            success("Đăng ký thành công");
            redirect("/login");
        }else{
            error("Đăng ký thất bại");
        }
    };

    return (
        <div className="register">
            <div className="register__wrapper">

                <div className="register__card">
                    <h2 className="register__title">Đăng ký</h2>

                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        className="register__form"
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[
                                { required: true, message: "Vui lòng nhập họ và tên" }
                            ]}
                        >
                            <Input size="large" placeholder="Nhập email..." />
                        </Form.Item>
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

                        <div className="register__options">
                            <Link to="/password/forgot">Quên mật khẩu?</Link>
                        </div>

                        <Button
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            className="register__btn"
                        >
                            Đăng ký
                        </Button>
                    </Form>

                    <div className="register__register">
                        <span>Bạn đã có tài khoản?</span>
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FormRegister;