import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import { useEffect } from "react";
import { MenuStyled } from "../StyledComponents";
import { useSelector } from "react-redux";
import useHeaderMiddle from "./useHeaderMiddle";
import { formatCurrency } from "./../../utils/format";
import ProductColor from "../ProductColor";
import styled from "styled-components";
const DropDownContainer = styled.div`
  max-height: 40vh;
  width: 300px;
  overflow-y: scroll;
  padding-right: 25px;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ProductCardDetailWrapper = styled.h3`
  display: flex !important;
  flex-direction: column;
  gap: 10px;

  .product-variant {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
  }
  .product-nav-dots {
    margin: 0;
  }
`;

const HeaderMiddle = () => {
  const { handleShowMobileMenu, cartDropDownProps } = useHeaderMiddle();
  const { products, handleRemoveProduct, total } = cartDropDownProps;
  const _onHandleRemoveProduct = (e, index) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleRemoveProduct(index);
  };

  // Header Search Toggle

  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button
            className="mobile-menu-toggler"
            onClick={handleShowMobileMenu}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <Link to={PATHS.HOME} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </Link>
        </div>
        <nav className="main-nav">
          <MenuStyled className="menu">
            <li>
              <Link to={PATHS.HOME}>Home</Link>
            </li>
            <li>
              <Link to={PATHS.ABOUT}>About Us</Link>
            </li>
            <li>
              <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
            </li>
            <li>
              <Link to={PATHS.PRODUCT.INDEX}>Blog</Link>
            </li>
            <li>
              <Link to={PATHS.CONTACT}>Contact Us</Link>
            </li>
          </MenuStyled>
        </nav>
        <div className="header-right">
          <div className="header-search">
            <a href="#" className="search-toggle" role="button" title="Search">
              <i className="icon-search" />
            </a>
            <form action="#" method="get">
              <div className="header-search-wrapper">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control"
                  name="q"
                  id="q"
                  placeholder="Search in..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="dropdown cart-dropdown">
            <Link
              to={PATHS.CART}
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <i className="icon-shopping-cart" />
              <span className="cart-count">{products?.length}</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              {products?.length == 0 && (
                <p>
                  There are currently no products in the cart {">>"}{" "}
                  <Link to={PATHS.PRODUCT.INDEX}>Go To Shop</Link>
                </p>
              )}
              <DropDownContainer className="dropdown-cart-products">
                {products?.length > 0 &&
                  products?.map((product, index) => {
                    const {
                      id,
                      slug,
                      name,
                      quantity,
                      price,
                      variant,
                      images,
                      discount,
                    } = product;
                    const detailPath = PATHS.PRODUCT.INDEX + `/${slug}`;

                    let imagePath = images?.[0];
                    if (imagePath?.split("http")?.length > 2) {
                      imagePath = imagePath?.split("http");
                      imagePath = "http" + imagePath[2];
                    }

                    return (
                      <div className="product" key={index}>
                        <ProductCardDetailWrapper className="product-cart-details">
                          <h4 className="product-title">
                            <Link to={detailPath}>{name}</Link>
                          </h4>
                          <div className="product-variant">
                            Color: <ProductColor colors={[variant]} />
                          </div>
                          <span className="cart-product-info">
                            <span className="cart-product-qty">{quantity}</span>{" "}
                            x{" "}
                            {discount ? (
                              <>
                                <span className="new-price">
                                  ${formatCurrency(price - discount)}
                                </span>
                                <span className="old-price">
                                  (Was ${formatCurrency(price)})
                                </span>
                              </>
                            ) : (
                              <>${formatCurrency(price || 0)}</>
                            )}
                          </span>
                        </ProductCardDetailWrapper>
                        <figure className="product-image-container">
                          <Link to={detailPath} className="product-image">
                            <img src={imagePath} alt="product" />
                          </Link>
                        </figure>
                        <a
                          href="#"
                          className="btn-remove"
                          title="Remove Product"
                          onClick={(e) => {
                            _onHandleRemoveProduct(e, index);
                          }}
                        >
                          <i className="icon-close" />
                        </a>
                      </div>
                    );
                  })}
              </DropDownContainer>
              {products.length > 0 && (
                <>
                  {" "}
                  <div className="dropdown-cart-total">
                    <span>Total</span>
                    <span className="cart-total-price">
                      ${formatCurrency(total)}
                    </span>
                  </div>
                  <div className="dropdown-cart-action">
                    <a href={PATHS.CART} className="btn btn-primary">
                      View Cart
                    </a>
                    <a
                      href={PATHS.CHECKOUT}
                      className="btn btn-outline-primary-2"
                    >
                      <span>Checkout</span>
                      <i className="icon-long-arrow-right" />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
