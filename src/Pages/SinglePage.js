import React from "react";
import WhyUs from "./WhyUs";
import Search from "./Search";
import FeatureIn from "../Components/FeatureIn";
import Blog from "../Components/Blog";
import Herro from "../Components/Herro";

function SinglePage() {
  return (
    <div>
      <Herro />
      <Search />
      <WhyUs />
      <FeatureIn />
      <Blog />
    </div>
  );
}

export default SinglePage;
