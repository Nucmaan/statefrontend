import React from "react";
import WhyUs from "./WhyUs";
import Search from "./Search";
import FeatureIn from "../Components/FeatureIn";
import Blog from "../Components/Blog";
import Herro from "../Components/Herro";
import SearchBox from "../Components/SearchBox";

function SinglePage() {
  return (
    <div>
      <Herro />
      <SearchBox />
      <Search />
      <WhyUs />
      <FeatureIn />
      <Blog />
    </div>
  );
}

export default SinglePage;
