import { useParams } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from 'react';



const Comments = () => {

  const userState = useSelector((state) => state.user);
  const [comments, setComments] = useState([])
  const { id } = useParams();

  const getComments = async (e) => {
    try {


      const url = '/api/comments/getcomments'; // Replace with your actual URL
      const token = userState.userInfo.token;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const postData = {
        pid: id,

      };

      const response = await axios.post(url, postData, { headers });
      if (response.status === 200) {
        setComments(response.data)
      }

    } catch (error) {
      toast.error("Something went wrong");
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);


      throw new Error(error.message);

    }

  }

  const onDelete = (id) => {


  }

  const onApprove = (id) => { }


  useEffect(() => {
    getComments()
  }, [])



  return (
    <>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <span className="font-bold mr-2">{comment.username}</span>
              <span className="text-gray-500">{comment.createdAt}</span>
              <button
                onClick={() => onDelete(comment._id)} // Call the onDelete function with the comment ID
                className="px-2 py-1 text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Delete
              </button>
              <button
                onClick={() => onApprove(comment._id)} // Call the onApprove function with the comment ID
                className={`px-2 py-1 text-sm font-semibold  ${comment.check ? "text-red-600" : "text-green-600"} hover:text-green-800`}
              >
                {comment.check ? "Disapprove" : "Approve"}
              </button>
            </div>
            <p className="text-gray-800">{comment.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
