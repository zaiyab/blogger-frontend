import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";


const NewPost = () => {
  const userState = useSelector((state) => state.user);

  const [title,setTitle] = useState();
  const handletitle = (v)=>{
    setTitle(v.target.value)
  }
  const [desc,setDesc] = useState();
  const handledesc = (v)=>{
    setDesc(v.target.value)
  }
  const handleclear = ()=>{
    setTitle("");
    setDesc('');
  }
  const handlesubmit =async (e)=>{
    e.preventDefault();
    try {
      const url = '/api/posts'; // Replace with your actual URL
      const token = userState.userInfo.token;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const postData = {
      title:title,
      caption:desc
      };

      const response = await axios.post(url, postData, { headers });
 if(response){
  toast.success("Post is added");
 }
    } catch (error) {
    if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
    
  }

  

  return (
    <form onSubmit={handlesubmit}>
    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>

  <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <input value={title} onChange={handletitle} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" type="text" />
    <textarea value={desc} onChange={handledesc} className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false" placeholder="Describe everything about this post here"></textarea>
    



    <div className="buttons flex mt-2">
      <div onClick={handleclear}  className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
      <button type='submit'><div o className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div></button>
    </div>
  </div>
    </div>
    </form>
  )
}

export default NewPost
