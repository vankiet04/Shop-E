import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import CartTable from "./CartTable";
import CartSummary from "./CartTotal";
import useCartPage from "./useCartPage";
import CartTotal from "./CartTotal";

const CartPage = () => {
  const { cartTableProps, cartSummaryProps } = useCartPage();
  // console.log("cartTableProps", cartTableProps);
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: 'url("/assets/images/page-header-bg.jpg")',
        }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>

      <Breadcrumb className="breadcrumb-nav border-0 mb-0">
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <CartTable {...cartTableProps} />
              <CartTotal {...cartSummaryProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
