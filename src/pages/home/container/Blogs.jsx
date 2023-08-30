import React, { useState } from "react";

import BlogCard from "../../../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import BlogCardSkeleton from "../../../components/BlogCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";

const Blogs = ({ searchKeyword = '', page = 1, limit = 12, setProgress, category }) => {
  setProgress(40)
  const { data, isLoading, isError } = useQuery({

    queryFn: () => getAllPosts(searchKeyword, page, limit, category),
    queryKey: ["posts",],
    onError: (error) => {
      toast.error(error.message);
    },
  });
  setProgress(100)


  return (
    <>

      <section className="flex flex-col container mx-auto px-5 py-10">

        <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading ? (
            [...Array(3)].map((item, index) => (
              <BlogCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : (
            data?.data.map((post) => (

              post.active ? <BlogCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              /> : ""
            ))
          )}
        </div>

      </section>
    </>
  );
};

export default Blogs;
