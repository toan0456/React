import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import WebsiteLayout from "./layouts/WebsiteLayout";
import About from "./page/About";
import Home from "./page/Home";
import Notfound from "./page/Not-found";
import AdminLayout from "./layouts/AdminLayout";
import ProductDetail from "./page/ProductDetail";
import Dashbroad from "./page/admin/Dashbroad";
import ListProductsAdmin from "./page/admin/List-Products-Admin";
import AddProducts from "./page/admin/Add-Products";
import EditProduct from "./page/admin/EditProducts";
import Register from "./page/Register";
import Login from "./page/Login";
import Private from "./page/admin/Private";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="chi-tiet-sp/:id" element={<ProductDetail />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route path="/admin" element={<Private />}>
          <Route path="" element={<Navigate to="/admin/dashboard" />} />
          <Route path="" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashbroad />} />
            <Route path="list-product" element={<ListProductsAdmin />} />
            <Route path="add-product" element={<AddProducts />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
