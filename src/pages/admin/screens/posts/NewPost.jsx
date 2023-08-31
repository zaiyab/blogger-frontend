import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import LoadingBar from 'react-top-loading-bar';

const NewPost = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const userState = useSelector((state) => state.user);
  const [progress, setProgress] = useState(0)
  const [links, setLinks] = useState([{ title: "", code: '' }, { title: "", code: '' }, { title: "", code: '' }])
  const [title, setTitle] = useState();
  const handletitle = (v) => {
    setTitle(v.target.value)
  }
  const [desc, setDesc] = useState();
  const handledesc = (v) => {
    setDesc(v.target.value)
  }
  const handleChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };
  const handleclear = () => {
    setTitle("");
    setDesc('');

 

  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !desc || !selectedCategory) {
        toast.error(`Title description and category are required.`);
        return;
      }

      const url = '/api/posts'; // Replace with your actual URL
      const token = userState.userInfo.token;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const postData = {
        title: title,
        caption: desc,
        links: links,
        category: selectedCategory
      };

      const response = await axios.post(url, postData, { headers });
      setProgress(70)

      if (response.status === 200) {
        toast.success("Post is added");
        handleclear()
      }
      setProgress(100)

    } catch (error) {
      setProgress(100)

      toast.error("Something went wrong");
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);


      throw new Error(error.message);

    }

  }

  // const { data } = useQuery({
  //   queryFn: () => fetchCategories(userState.userInfo.token),

  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });
  const [categories, setCategories] = useState([])
  const getCategories = async () => {
    try {
      const url = '/api/cat/allcategories'; // Replace with your actual URL
      const token = userState.userInfo.token;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const postData = {

      };

      const response = await axios.post(url, postData, { headers });
      if (response.status === 200) {
        setCategories(response.data.categories);

      }
    } catch (error) {

      toast.error("Something went wrong");
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);


      throw new Error(error.message);

    }

  }

  useEffect(() => {
    getCategories(

    )
  }, [])
  return (
    <>
      <LoadingBar
        color='#007bff'
        progress={progress}
      // onLoaderFinished={() => setProgress(0)}
      />
      <form onSubmit={handlesubmit}>
        <div>

          <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>

          <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            >
              <option value="">Select a category</option>
              {categories ? categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              )) : ""}
            </select>
            <input value={title} onChange={handletitle} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" type="text" />
            <textarea value={desc} onChange={handledesc} className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false" placeholder="Describe everything about this post here"></textarea>


            {links.map((link, index) => (
              <>
                <div className='flex flex-col' key={index}>
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
                </div>
              </>
            ))}




            <div className="buttons flex mt-2">
              <button
                onClick={handleclear}
                className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                type="button" // This is a regular button, not for form submission
              >
                Cancel
              </button>
              <button
                className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                type="submit" // This button will submit the form
              >
                Post
              </button>
            </div>

          </div>
        </div>
      </form>
    </>
  )
}

export default NewPost
