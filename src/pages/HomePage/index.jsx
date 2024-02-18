import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import BrandSection from "./BrandSection";
import DealSection from "./DealSection";
import FeaturedSection from "./FeaturedSection";
import GetDealSection from "./GetDealSection";
import HotProductSection from "./HotProductSection";
import IntroSection from "./IntroSection";
import ServiceSection from "./ServiceSection";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    featuredProps,
    serviceProps,
    getDealProps,
  } = useHomePage();
  // console.log("introProps", introProps);
  // console.log("hotProductProps", hotProductProps);
  // console.log("dealProps", dealProps);
  // console.log("brandProps", brandProps);
  // console.log("featuredProps", featuredProps);
  // console.log("serviceProps", serviceProps);
  // console.log("getDealProps", getDealProps);
  return (
    <main className="main">
      <IntroSection {...introProps} />
      <HotProductSection {...hotProductProps} />
      <div className="mb-7 mb-lg-11" />
      <DealSection {...dealProps} />
      <BrandSection {...brandProps} />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <FeaturedSection {...featuredProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <ServiceSection {...serviceProps} />
      <GetDealSection {...getDealProps} />
    </main>
  );
};

export default HomePage;
