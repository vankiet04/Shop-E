import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import { Controller, useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../constants/validate";
import { Select, message } from "antd";
import { formatCurrency, removeAccents } from "../../utils/format";
import useAddress from "../../hooks/useAddress";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import ProductColor from "../../components/ProductColor";
import { PAYMENT_METHOD } from "../../constants/general";
import cn from "./../../utils/cn";

const CheckoutForm = ({ handleCheckout }) => {
  const { cartInfo } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.auth);
  // console.log("cartInfo", cartInfo);
  // console.log("profile", profile);
  const { firstName, phone, email, province, district, ward, street } =
    profile || {};
  const {
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useAddress();
  const {
    product,
    subTotal,
    shipping,
    total,
    quantity,
    variant,
    totalProduct,
    discount,
    discountCode,
  } = cartInfo || {};

  const renderProductInfo = product?.map((item, index) => ({
    ...item,
    quantity: quantity?.[index],
    variant: variant?.[index],
    totalProduct: totalProduct?.[index],
  }));

  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(undefined);
  const isCash = currentPaymentMethod === PAYMENT_METHOD.cash;
  const isCard = currentPaymentMethod === PAYMENT_METHOD.card;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset?.({ firstName, phone, email, province, district, ward, street });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);
  const _onProvinceChange = (changeId) => {
    // console.log("provincechange");
    // console.log("changeId", changeId);
    handleProvinceChange?.(changeId);

    reset({
      ...getValues(),
      province: changeId,
      district: undefined,
      ward: undefined,
    });
  };
  // console.log("provinceId", provinceId);
  // console.log("districts", districts);
  // console.log("wards", wards);
  const _onDistrictChange = (changeId) => {
    handleDistrictChange?.(changeId);
    reset({
      ...getValues(),
      district: changeId,
      ward: undefined,
    });
  };
  const _onWardChange = (changeId) => {
    handleWardChange?.(changeId);
    reset({
      ...getValues(),
      ward: changeId,
    });
  };
  const _onSubmit = (data) => {
    if (!shipping?.typeShip) {
      message.warning("Hãy chọn phương thức vận chuyển");
      return;
    }
    if (!currentPaymentMethod) {
      message.warning("Hãy chọn phương thức thanh toán");
      return;
    }
    // console.log("data", data);
    handleCheckout?.({
      formInfo: {
        ...data,
        province: provinces?.find((item) => item.value === provinceId),
        district: districts?.find((item) => item.value === districtId),
        ward: wards?.find((item) => item.value === wardId),
        paymentMethod: currentPaymentMethod,
      },
      cartInfo,
    });
  };
  // console.log("cartInfo", cartInfo);
  // console.log('formInfo', formInfo)
  // console.log("provinces", provinces);
  return (
    <form
      onSubmit={handleSubmit(_onSubmit)}
      className="checkout-form"
      noValidate
    >
      <div className="row">
        <div className="col-lg-9">
          <h2 className="checkout-title">Billing Details</h2>
          <div className="row">
            <div className="col-sm-4">
              <Input
                label="Họ tên"
                required
                {...register("firstName", { required: MESSAGE.required })}
                error={errors?.firstName?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                label="Số điện thoại"
                required
                {...register("phone", { required: MESSAGE.required })}
                error={errors?.phone?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                label="Email"
                required
                {...register("email", {
                  required: MESSAGE.required,
                  pattern: { value: REGREX.email, message: MESSAGE.email },
                })}
                error={errors?.email?.message || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <label>Tỉnh/Thành phố *</label>
              <Controller
                name="province"
                control={control}
                rules={{ required: MESSAGE.required }}
                render={({ formState: { errors } }) => {
                  return (
                    <>
                      <Select
                        className="form-control form-select"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Vui lòng chọn Tỉnh/Thành phố"
                        value={provinceId}
                        options={provinces}
                        optionFilterProp="children"
                        onChange={_onProvinceChange}
                        filterOption={(input, option) => {
                          removeAccents(option?.label ?? "")
                            .toLowerCase()
                            .includes(removeAccents(input.toLowerCase()));
                        }}
                      />
                      <p className="form-error" style={{ minHeight: 23 }}>
                        {errors?.province?.message || ""}
                      </p>
                    </>
                  );
                }}
              ></Controller>
            </div>
            <div className="col-sm-4">
              <label>Quận/Huyện *</label>
              <Controller
                name="district"
                control={control}
                rules={{ required: MESSAGE.required }}
                render={({ formState: { errors } }) => {
                  return (
                    <>
                      <Select
                        className="form-control form-select"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Vui lòng chọn Quận/Huyện"
                        value={districtId}
                        options={districts}
                        optionFilterProp="children"
                        onChange={_onDistrictChange}
                        filterOption={(input, option) => {
                          removeAccents(option?.label ?? "")
                            .toLowerCase()
                            .includes(removeAccents(input.toLowerCase()));
                        }}
                      />
                      <p className="form-error" style={{ minHeight: 23 }}>
                        {errors?.province?.message || ""}
                      </p>
                    </>
                  );
                }}
              ></Controller>
            </div>
            <div className="col-sm-4">
              <label>Xã/Phường *</label>
              <Controller
                name="ward"
                control={control}
                rules={{ required: MESSAGE.required }}
                render={({ formState: { errors } }) => {
                  return (
                    <>
                      <Select
                        className="form-control form-select"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Vui lòng chọn Xã/Phường"
                        value={wardId}
                        options={wards}
                        optionFilterProp="children"
                        onChange={_onWardChange}
                        filterOption={(input, option) => {
                          removeAccents(option?.label ?? "")
                            .toLowerCase()
                            .includes(removeAccents(input.toLowerCase()));
                        }}
                      />
                      <p className="form-error" style={{ minHeight: 23 }}>
                        {errors?.province?.message || ""}
                      </p>
                    </>
                  );
                }}
              ></Controller>
            </div>
          </div>
          <Input
            label="Địa chỉ đường"
            placeholder="Nhập số nhà và tên đường"
            required
            {...register("street", { required: MESSAGE.required })}
            error={errors?.street?.message || ""}
          />
          <Input
            label="Order notes (optional)"
            renderInput={(inputProps) => {
              return (
                <textarea
                  {...inputProps}
                  {...register("note")}
                  className="form-control"
                  cols={30}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              );
            }}
            error={errors?.note?.message || ""}
          />
        </div>
        <aside className="col-lg-3">
          <div className="summary">
            <h3 className="summary-title">Your Order</h3>
            <table className="table table-summary">
              <thead>
                <tr>
                  <th>Product</th>
                  <th></th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {renderProductInfo?.map((product, index) => {
                  const {
                    name,
                    quantity,
                    price,
                    totalProduct,
                    variant,
                    slug,
                    discount,
                  } = product || {};
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={PATHS.PRODUCT.INDEX + `/${slug}`}>
                          {name}
                        </Link>
                        {discount!=0 ? <p>
                          {quantity} x ${price - discount} (Was ${price})
                        </p>:  <p>
                          {quantity} x ${price }
                        </p>}
                       
                      </td>
                      <td>
                        <ProductColor colors={[variant]} />
                      </td>
                      <td>${formatCurrency(totalProduct)}</td>
                    </tr>
                  );
                })}
                <tr className="summary-subtotal">
                  <td>Subtotal:</td>
                  <td></td>
                  <td>${formatCurrency(subTotal)}</td>
                </tr>
                {shipping ? (
                  <tr>
                    <td>Shipping:</td>
                    <td></td>
                    <td>
                      {shipping?.typeShip} - ${shipping?.price} -{" "}
                      <Link to={PATHS.CART}>Edit</Link>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>Shipping:</td>
                    <td></td>
                    <td>
                      <Link to={PATHS.CART}>Select Shipping</Link>
                    </td>
                  </tr>
                )}
                {discountCode && (
                  <tr>
                    <td>Discount:</td>
                    <td></td>
                    <td>
                      {discountCode} - ${discount}
                    </td>
                  </tr>
                )}
                <tr className="summary-total">
                  <td>Total:</td>
                  <td></td>
                  <td>${formatCurrency(total)}</td>
                </tr>
              </tbody>
            </table>
            <div className="accordion-summary" id="accordion-payment">
              <div className="card">
                <div
                  className="card-header"
                  id="heading-1"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.card)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a
                      className={cn({
                        collapsed: !isCard,
                      })}
                    >
                      {" "}
                      Direct bank transfer{" "}
                    </a>
                  </h2>
                </div>
                <div
                  className={cn("collapse", {
                    show: isCard,
                  })}
                >
                  <div className="card-body">
                    {" "}
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.{" "}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  id="heading-3"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.cash)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a
                      className={cn({
                        collapsed: !isCash,
                      })}
                    >
                      {" "}
                      Cash on delivery{" "}
                    </a>
                  </h2>
                </div>
                <div
                  id="collapse-3"
                  className={cn("collapse", {
                    show: isCash,
                  })}
                >
                  <div className="card-body">
                    Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit. Donec odio. Quisque volutpat
                    mattis eros.{" "}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary-2 btn-order btn-block"
            >
              <span className="btn-text">Place Order</span>
              <span className="btn-hover-text">Proceed to Checkout</span>
            </button>
          </div>
        </aside>
      </div>
    </form>
  );
};

export default CheckoutForm;
