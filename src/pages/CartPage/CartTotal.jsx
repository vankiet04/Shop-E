import React from "react";
import { formatCurrency } from "../../utils/format";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import { message } from "antd";
import RadioGroup from "../../context/RadioContext";
import { SHIPPING_OPTIONS } from "../../constants/general";

const CartTotal = ({
  product,
  subTotal,
  total,
  typeShip,
  handleUpdateShipping,
}) => {
  console.log("product", product);
  console.log("total", total);
  const navigate = useNavigate();
  const _onProceedCheckout = (e) => {
    e?.preventDefault();
    if (!product?.length) {
      message.warning("Trong giỏ hàng không có sản phẩm nào");
    } else if (!typeShip) {
      message.warning("Hãy chọn phương thức vận chuyển");
    } else {
      navigate(PATHS.CHECKOUT);
    }
  };
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${formatCurrency(subTotal)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            <RadioGroup
              onChange={handleUpdateShipping}
              defaultValue={typeShip || ""}
            >
              {SHIPPING_OPTIONS.map((option) => {
                const { value, label, price } = option;
                return (
                  <tr key={value} className="summary-shipping-row">
                    <td>
                      <RadioGroup.Item value={value}>{label}</RadioGroup.Item>
                    </td>
                    <td>${formatCurrency(price)}</td>
                  </tr>
                );
              })}
            </RadioGroup>
            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
                <Link to={PATHS.DASHBOARD.INDEX}>Change address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        <Link
          to={PATHS.CHECKOUT}
          className="btn btn-outline-primary-2 btn-order btn-block"
          onClick={_onProceedCheckout}
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
      <Link
        to={PATHS.PRODUCT.INDEX}
        className="btn btn-outline-dark-2 btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Link>
    </aside>
  );
};

export default CartTotal;
