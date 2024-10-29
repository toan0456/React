import React from "react";
import {
  Button,
  Image,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../axios/db";
import { Link } from "react-router-dom";

const ListProductsAdmin = () => {
  const queryC = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (item) => {
        return <Image src={item} width={50} />;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    ,
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục",
      key: "categoryId",
      dataIndex: "categoryId",
      render: (_, item) => {
        if (item.categoryId === "1") {
          return (
            <Tag color="green" key={item.categoryId}>
              Danh mục 1
            </Tag>
          );
        }
        if (item.categoryId === "2") {
          return (
            <Tag color="blue" key={item.categoryId}>
              Danh mục 2
            </Tag>
          );
        }
      },
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (_, item) => {
        if (item.type === "type1") {
          return <span key={item.type}>Mới</span>;
        }
        if (item.type === "type2") {
          return <span key={item.type}>Cũ</span>;
        }
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "available",
      key: "available",
      render: (_, item) => {
        if (item.available === true) {
          return (
            <Tag color="green" key={item.available}>
              Còn hàng
            </Tag>
          );
        }
        if (item.available === false) {
          return (
            <Tag color="red" key={item.available}>
              Hết hàng
            </Tag>
          );
        }
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc không??"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Xóa
            </button>
          </Popconfirm>

          <Link to={`/admin/edit-product/${record.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
              Sửa
            </button>
          </Link>
        </>
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      messageApi.success("Xóa thành công!!");
      queryC.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: ()=> {
      messageApi.error("Xóa không thành công!!")
    }
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get(`/products`);
      return res.data.map((item) => ({ ...item, key: item.id }));
    },
  });

  return (
    <>
      {contextHolder}
      <Skeleton loading={isLoading} active>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </>
  );
};
export default ListProductsAdmin;
