import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import BarChart from "./components/BarChart";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import About from "./components/About";
import UserProfile from "./components/UserProfile";
import EditUser from "./components/EditUser";
import axios from 'axios';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<About />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/charts" element={<BarChart />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path={"/user"} element={<UserProfile />} />
          <Route path={"/user/edit"} element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
