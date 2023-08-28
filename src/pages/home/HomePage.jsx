import React from "react";

import MainLayout from "../../components/MainLayout";
import Articles from "./container/Articles";
import CTA from "./container/CTA";
import Hero from "./container/Hero";
import LoadingBar from 'react-top-loading-bar';

import { useState } from "react";

const HomePage = () => {
  const [progress, setProgress] = useState(0)

  const [searchKeyword, setSearchKeyword] = useState()
  const search = (value) => {
    setSearchKeyword(value)
  }
  return (
    <MainLayout>
      <LoadingBar
        color='#007bff'
        progress={progress}
      // onLoaderFinished={() => setProgress(0)}
      />
      <Hero search={search} />
      <Articles searchKeyword={searchKeyword} key={searchKeyword} setProgress={setProgress} />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
