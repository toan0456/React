import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Radio from "antd/es/radio/radio";
import React, { useState } from "react";
import api from "../../axios/db";
import { PlusOutlined } from "@ant-design/icons";

const AddProducts = () => {
  const [form] = Form.useForm();
  const [mes, mesHien] = message.useMessage();
  const [ imageUrl, setImageUrl ] = useState("")

  const mutation = useMutation({
    mutationFn: async (product) => {
      return await api.post(`/products`, product);
      // console.log(product)
    },
    onSuccess: () => {
      form.resetFields();
      mes.success("Thêm thành công!!");
    },
    onError: () => {
      mes.error("Xóa thất bại!!");
    },
  });

  const onFinish = (data) => {
    if (!imageUrl) {
      return ;
    }
    mutation.mutate({...data, imageUrl});
  };

  const handleChange = (info) =>{
    // console.log(info)
    if (info.file.status === "done") {
      setImageUrl(info.file.response.secure_url)
    }
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      {mesHien}
      <h1 className="text-3xl font-bold mb-3">Thêm sản phẩm</h1>
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        disabled={mutation.isPending}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Bắt buộc nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Bắt buộc nhập giá sản phẩm",
            },
            {
              type: "number",
              min: 0,
              message: "Giá không được âm",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Tình trạng" name="available" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Loại" name="type">
          <Radio.Group>
            <Radio value="type1">Mới</Radio>
            <Radio value="type2">Cũ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://api.cloudinary.com/v1_1/dywkkihjh/image/upload"
            listType="picture-card"
            data={{
              upload_preset: "ml_default",
            }}
            onChange={handleChange}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Danh muc" name="categoryId">
          <Select>
            <Select.Option value="1">Danh mục 1</Select.Option>
            <Select.Option value="2">Danh mục 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          {/* <Button type="primary" htmlType="submit">Thêm</Button> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded">
            Thêm
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProducts;
