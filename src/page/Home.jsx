import React from "react";
import { Card, List, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "../axios/db";
import { Link } from "react-router-dom";
const { Meta } = Card;

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await api.get(`/products`);
    },
  });
  // console.log(data);
  // console.log(data?.data);

  const productCateID1 = data?.data.filter((item) => item.categoryId === "1");
  const productCateID2 = data?.data.filter((item) => item.categoryId === "2");

  // console.log(productCateID1);
  // console.log(productCateID2);
  return (
    <div>
      <div
        className="container text-center mx-auto"
        style={{ textAlign: "-webkit-center" }}
      >
        <Skeleton loading={isLoading} active>
          <h2 className="text-3xl font-bold my-4 mx-4 text-start">
            Danh mục sản phẩm 1
          </h2>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
            }}
            dataSource={productCateID1?.slice(0, 12)}
            renderItem={(item) => (
              <List.Item>
                <Link to={`/chi-tiet-sp/${item.id}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt={item.name} src={item.imageUrl} />}
                  >
                    <Meta title={item.name} description={item.description} />
                  </Card>
                </Link>
              </List.Item>
            )}
          />
          <h2 className="text-3xl font-bold my-4 mx-4 text-start">
            Danh mục sản phẩm 2
          </h2>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
            }}
            dataSource={productCateID2?.slice(0, 12)}
            renderItem={(item) => (
              <List.Item>
                <Link to={`/chi-tiet-sp/${item.id}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt={item.name} src={item.imageUrl} />}
                  >
                    <Meta title={item.name} description={item.description} />
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        </Skeleton>
      </div>
    </div>
  );
};

export default Home;
