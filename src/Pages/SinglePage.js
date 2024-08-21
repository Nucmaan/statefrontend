import React from "react";
import WhyUs from "./WhyUs";
import Search from "./Search";
import FeatureIn from "../Components/FeatureIn";
import Blog from "../Components/Blog";
import Herro from "../Components/Herro";
import PropertyListCard from "./PropertyListCard";

function SinglePage() {
  return (
    <div>
      <Herro />
      <PropertyListCard />
      <Search />
      <WhyUs />
      <FeatureIn />
      <Blog />
    </div>
  );
}

export default SinglePage;
