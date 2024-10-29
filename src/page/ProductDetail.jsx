import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../axios/db";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      return await api.get(`/products/${id}`);
    },
  });
  return (
    <>
      <Skeleton loading={isLoading} active>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={data?.data.imageUrl}
                alt={data?.data.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{data?.data.name}</h1>
              <p className="text-xl text-gray-700 mb-4">
                Giá:{" "}
                <span className="text-green-500 font-semibold">
                {data?.data.price} $
                </span>
              </p>
              <p className="text-gray-700 mb-4">
              {data?.data.description}
              </p>
              <p className="text-gray-700 mb-4">
                Loại hàng: <span className="font-semibold">{data?.data.type === "type1"? "Mới": "Cũ"}</span>
              </p>
              <p className="text-gray-700 mb-4">
                Danh mục: <span className="font-semibold">{data?.data.categoryId === "1"? "Danh mục sản phẩm 1": "Danh mục sản phẩm 2"}</span>
              </p>
              <p className="text-gray-700 mb-4">
                Trạng thái:{" "}
                <span className="text-green-500 font-semibold">{data?.data.available === true? "Còn hàng": "Hết hàng"}</span>
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </Skeleton>
    </>
  );
};

export default ProductDetail;
