import React from "react";
import Header from "./components/header/Header";
import { TopHeader } from "./components/header/TopHeader";
import HeroSlider from "./components/slider/HeroSlider";

const App = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <HeroSlider />
    </>
  );
};

export default App;
