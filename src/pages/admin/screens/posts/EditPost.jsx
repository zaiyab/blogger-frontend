import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { Link, useParams } from "react-router-dom";
import BlogDetailSkeleton from "../../../blogDetail/components/BlogDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
// import parseJsonToHtml from "../../../../utils/parseJsonToHtml";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [links, setLinks] = useState([{ title: "", code: '' }, { title: "", code: '' }, { title: "", code: '' }])


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [tags, setTags] = useState('')
  const [tagsArray, setTagsArray] = useState()
  const handleTags = (v) => {
    setTags(v.target.value)
    setTagsArray(v.target.value.split(','));
  }
  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.photo);
    }
    data?.links ? setLinks(data.links) : setLinks(links)
    data?.tags ? setTags(data.tags.map((t) => t)) : setTags('')
    data?.tags ? setTagsArray(data.tags) : setTagsArray(null)


  }, [data, isError, isLoading]);

  // useLayoutEffect(() => { setTagsArray(tags.split(' ')) }, [tags])
  const handleChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (tagsArray[0] === "") {
      toast.error(`Atleast 1 tag is required.`);
      return;
    }
    console.log(tagsArray)
    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);

    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let reponse = await fetch(url);
        let blob = await reponse.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }
    updatedData.append("document", JSON.stringify({ body }));
    updatedData.append("links", JSON.stringify(links));
    updatedData.append("tags", JSON.stringify(tagsArray))

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };



  return (
    <div className="flex flex-col">
      {isLoading ? (
        <BlogDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : (
                <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="w-7 h-auto text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
              Delete Image
            </button>
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>
            <div className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg ">
              <textarea value={tags} onChange={handleTags} className="description bg-gray-100 sec p-3 h-24 border border-gray-300 outline-none" spellcheck="false" placeholder="Enter tags seperated by Comma"></textarea>

              {links.map((link, index) => (
                <>
                  <h1 className='font-bold font-roboto text-center mt-2'>Link {index + 1}</h1>
                  <input
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    spellCheck="false"
                    placeholder={`Insert title ${index + 1}`}
                    type="text"
                    value={link.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                  />
                  <textarea
                    className="description bg-gray-100 sec p-3 h-24 border border-gray-300 outline-none"
                    spellCheck="false"
                    placeholder="Place code here"
                    value={link.code}
                    onChange={(e) => handleChange(index, "code", e.target.value)}
                  ></textarea>
                </>
              ))}

            </div>
            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70 mt-3"
            >
              Update Post
            </button>

          </article>
        </section>
      )}

    </div>
  );
};

export default EditPost;
