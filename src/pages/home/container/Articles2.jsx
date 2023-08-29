import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { useEffect } from "react";
let isFirstRun = true;

const Articles2 = ({ searchKeyword = '', page = 1, limit = 12, setProgress }) => {

    const [currentPage, setCurrentPage] = useState(1);



    setProgress(40)
    const { data, isLoading, isError, refetch,
    } = useQuery({

        queryFn: () => getAllPosts(searchKeyword, currentPage, limit),
        queryKey: ["posts",],
        onError: (error) => {
            toast.error(error.message);
        },
    });
    setProgress(100)

    useEffect(() => {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        refetch();
    }, [refetch, currentPage])



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
                            post.active ? <ArticleCard
                                key={post._id}
                                post={post}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                            /> : ""

                        ))
                    )}


                </div>
                {!isLoading && (
                    <Pagination
                        onPageChange={(page) => setCurrentPage(page)}
                        currentPage={currentPage}
                        totalPageCount={JSON.parse(
                            data?.headers?.["x-totalpagecount"]
                        )}
                    />
                )}
            </section>
        </>
    );
};

export default Articles2;
