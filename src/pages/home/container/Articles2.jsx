import React, { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"

import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";

const Articles2 = ({ searchKeyword = '', page = 1, limit = 12, setProgress }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // 
    const [jumpPage, setJumpPage] = useState(currentPage);

    setProgress(40)
    const { data, isLoading, isError } = useQuery({

        queryFn: () => getAllPosts(searchKeyword, page, limit),
        queryKey: ["posts",],
        onError: (error) => {
            toast.error(error.message);
        },
    });
    setProgress(100)


    const handlePageChange = (page) => {
        setCurrentPage(page);
        //  getUsers();
    };
    const handleJumpPageChange = (event) => {
        const newJumpPage = parseInt(event.target.value);
        setJumpPage(newJumpPage);
    };
    const handleJumpToPage = () => {
        if (jumpPage >= 1 && jumpPage <= totalPages) {
            setCurrentPage(jumpPage);
            setJumpPage(jumpPage);
            //     getUsers();
        }
    };

    return (
        <>

            <section className="flex flex-col container mx-auto px-5 py-10">

                <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
                    {isLoading ? (
                        [...Array(3)].map((item, index) => (
                            <ArticleCardSkeleton
                                key={index}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                            />
                        ))
                    ) : isError ? (
                        <ErrorMessage message="Couldn't fetch the posts data" />
                    ) : (
                        data?.data.map((post) => (
                            <ArticleCard
                                key={post._id}
                                post={post}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                            />
                        ))
                    )}
                    <div className="flex items-center mb-3">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className='mx-2'
                        >
                            <GrLinkPrevious />
                        </button>
                        <input
                            type="number"
                            value={jumpPage}
                            onChange={handleJumpPageChange}
                            className="mx-2 w-16 text-center"
                        />
                        <button
                            onClick={handleJumpToPage}
                            className="mx-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Go
                        </button>
                        <span className="mx-2 font-roboto  text-dark-hard" >Page&nbsp;{currentPage}&nbsp;Of&nbsp;{totalPages}</span>
                        <button

                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                        >
                            < GrLinkNext />
                        </button>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Articles2;
