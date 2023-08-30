import React from "react";

import MainLayout from "../../components/MainLayout";

import LoadingBar from 'react-top-loading-bar';

import { useState } from "react";
import Search from "../../components/Search";
import Blogs from "./container/Blogs";
import { useLocation } from "react-router-dom";


const BlogPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [category, setCategory] = useState(queryParams.get("category"))
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
            <div className="flex flex-col items-center  ">
                <Search search={search} />
                <Blogs category={category ? category : ''} searchKeyword={searchKeyword} key={searchKeyword} setProgress={setProgress} />
            </div>
        </MainLayout>
    );
};

export default BlogPage;
