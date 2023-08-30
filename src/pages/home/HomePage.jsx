import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import MainLayout from "../../components/MainLayout";
import Blogs from "./container/Blogs";
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
      <Blogs searchKeyword={searchKeyword} key={searchKeyword} setProgress={setProgress} />
      <Link to="/blogs" >
        <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
          <span>More articles</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </Link>
      <CTA />

    </MainLayout>
  );
};

export default HomePage;
