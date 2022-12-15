import { Form, Input, Checkbox, Button } from "antd";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setCredentials, useLoginMutation } from "../../app/services/auth.service";
import styles from "./Login.module.scss";

const LoginPage = () => {
    const form = useRef(null);
    const [loginUser] = useLoginMutation()
    const dispatch = useDispatch()
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        console.log(values.username, values.password)
        setError("")

        const result = await loginUser({
            email: values.username,
            password: values.password
        })

        // @ts-ignore
        if (result?.error && result?.error?.data && result?.error?.data?.message) {
            // @ts-ignore
            setError(result?.error?.data?.message);
        } else {
            setError("")
        }

        // @ts-ignore
        if (result?.data && result?.data?.token && result?.data?.name && result?.data?.id) {
        // @ts-ignore
            const token = result?.data?.token
            // @ts-ignore
            const id = result?.data?.id
            // @ts-ignore
            const name = result?.data?.name
            dispatch(setCredentials({
                id: id,
                name: name,
                token: token
            }))

            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('id', id);

            navigate("/")
            
        }


        console.log(result)




    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);

    };

    return <>
        <div style={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            background: 'url(https://source.unsplash.com/1600x900/?building)'
        }}>

            <Form

                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.Form}
                ref={form}

            >
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Введите почтовый адрес' }]}

                >
                    <Input autoComplete='username'/>
                </Form.Item>


                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password autoComplete='password' />
                </Form.Item>


                {error && <div style={{
                    color: "brown",
                    paddingBottom: "1em"
                }}>
                    Неверный логин или пароль.
                </div>}

                <Form.Item >
                    <Button onClick={() => {
                        // router.push('/')
                    }} style={{
                        width: '100%'
                    }} type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>

    </>
}

export default LoginPage;