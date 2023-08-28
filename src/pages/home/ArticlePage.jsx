import React from "react";

import MainLayout from "../../components/MainLayout";
import Articles from "./container/Articles2";

import LoadingBar from 'react-top-loading-bar';

import { useState } from "react";
import Search from "../../components/Search";

const ArticlePage = () => {
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
                <Articles searchKeyword={searchKeyword} key={searchKeyword} setProgress={setProgress} />
            </div>
        </MainLayout>
    );
};

export default ArticlePage;
