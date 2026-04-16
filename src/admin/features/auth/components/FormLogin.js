import { Button, Form, Input} from 'antd';

import { useAuth } from '../hooks/useAuth';
import {useRedirect} from "../../../../shared/hooks/useRedirect";
import { useNotification } from '../../../../shared/hooks/useNotification';
function FormLogin(){
    const {redirect} = useRedirect();
    const {success,error} = useNotification();
    const {login,loading} = useAuth();
    const onFinish = async (values) => {
        const result = await login(values);
        if(result.success){
            success("Đăng nhập thành công");
            redirect("/admin/dashboard");
        }else{
            error("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Lỗi:', errorInfo);
    };
    return(
        <>
            <div className='login__form'>
                <h2 className="login__title">Admin Login</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default FormLogin;