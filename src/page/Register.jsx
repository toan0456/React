import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/db";

const Register = () => {
  const [form] = Form.useForm();
  const [ mes, mesHien ] = message.useMessage()
  const nav = useNavigate()

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get(`/users`)
      return res.data
    }
  })


  const mutation = useMutation({
    mutationFn: async (dataForm) => {
      // form.resetFields();
      await api.post(`/register`, dataForm);
      await mes.success("Đăng ký thành công")
      nav(`/login`)
    },

    onError: ()=> {
      mes.error("Đăng ký thất bại!")
    }
  })

  const onFinish = (dataForm) => {
    const { email, password } = dataForm
    const dataToSend = { email, password}
    const checkEmail = data.find( item => item.email === email)
    if (checkEmail) {
      return message.error("Email đã đăng ký")
    }
    mutation.mutate(dataToSend);
  };

  return (
    <>
    {mesHien}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Tạo tài khoản
              </h1>
              <Form
                className="space-y-4 md:space-y-6"
                name="register"
                layout="vertical"
                form={form}
                onFinish={onFinish}
              >
                <Form.Item
                  label={"Email"}
                  name={"email"}
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  rules={[
                    { required: true,
                      message: "Email là bắt buộc!"
                    },
                    {
                      type: "email",
                      message: "Email không hợp lệ!"
                    }
                  ]}
                >
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                  />
                </Form.Item>
                <Form.Item
                  label={"Mật khẩu"}
                  name={"password"}
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu là bắt buộc!"
                    },
                    {
                      min: 8,
                      message: "Mật khẩu không ít hơn 8 ký tự!"
                    }
                  ]}
                >
                  <Input.Password
                    name="password"
                    id="password"
                    placeholder="••••••••"
                  />
                </Form.Item>
                <Form.Item
                  label={"Nhập lại mật khẩu"}
                  htmlFor="confirm-password"
                  name={"comfirm-password"}
                  dependencies={["password"]}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  rules={[
                    {
                      required: true,
                      message: "Nhập lại mật khẩu là bắt buộc!"
                    },
                    ({ getFieldValue}) => ({
                      validator(_, value){
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Không trùng khớp với mật khẩu"))
                      }
                    })
                  ]}
                >
                  <Input.Password
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Tạo tài khoản
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Đã có tài khoản?{" "}
                  <Link
                    to={`/login`}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
