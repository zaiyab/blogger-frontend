import React, { useEffect } from "react";

import MainLayout from "../../components/MainLayout";

import LoadingBar from 'react-top-loading-bar';

import { useState } from "react";
import Search from "../../components/Search";
import Blogs from "./container/Blogs";
import { useLocation } from "react-router-dom";


const BlogPage = (categories) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [category, setCategory] = useState(queryParams.get("category"))
    const [progress, setProgress] = useState(0)

    const [searchKeyword, setSearchKeyword] = useState()
    const search = (value) => {
        setSearchKeyword(value)
    }
    const [key, setKey] = useState(0);
    useEffect(() => {
        setCategory(queryParams.get("category"))


    }, [location])
    return (
        <MainLayout categories={categories}>
            <LoadingBar
                color='#007bff'
                progress={progress}
            // onLoaderFinished={() => setProgress(0)}
            />
            <div className="flex flex-col items-center  ">
                <Search search={search} />
                <Blogs key={category + searchKeyword} category={category ? category : ''} searchKeyword={searchKeyword} setProgress={setProgress} />
            </div>
        </MainLayout>
    );
};

export default BlogPage;
