import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import LoadingBar from 'react-top-loading-bar';
import Pagination from '../../../components/Pagination';


const Users = () => {


    const [selectedNumber, setSelectedNumber] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // 
    const userState = useSelector((state) => state.user);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [progress, setProgress] = useState(0)

    const [users, setUsers] = useState([
        {
            "_id": "64ea7517f124591aefb4445f",
            "avatar": "",
            "name": "Sample",
            "email": "Sample@gamil.com",

            "verified": false,
            "admin": false,
            "createdAt": "2023-08-26T21:56:39.681Z",
            "updatedAt": "2023-08-26T21:56:39.681Z",
            "__v": 0
        },])

    const getUsers = async () => {
        try {
            setProgress(20)
            const url = '/api/users/getusers'; // Replace with your actual URL
            const token = userState.userInfo.token;

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            setProgress(70)
            const postData = {
                limit: selectedNumber,
                page: currentPage,
                searchKeyword: searchKeyword,
            };

            const response = await axios.post(url, postData, { headers });
            if (response.status === 200) {
                setUsers(response.data);

                const totalCount = parseInt(response.headers["x-totalcount"]);
                const pageSize = parseInt(response.headers["x-pagesize"]);
                const totalPageCount = parseInt(response.headers["x-totalpagecount"]);
                setTotalPages(totalPageCount);
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


    const handleDelete = async (id) => {
        try {
            setProgress(20)
            const url = '/api/users/deleteusers'; // Replace with your actual URL
            const token = userState.userInfo.token;

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const postData = {
                id: id,


            };

            const response = await axios.post(url, postData, { headers });
            setProgress(70)

            if (response.status === 200) {

                const updatedUsers = users.filter(user => user._id !== response.data._id);
                setUsers(updatedUsers);
                toast.success("Deleted User")
            }
            setProgress(100)

        } catch (error) {
            toast.error("Something went wrong");
            setProgress(100)

            if (error.response && error.response.data.message)
                throw new Error(error.response.data.message);


            throw new Error(error.message);

        }

    };


    const handleVerificationToggle = async (state, id) => {
        try {
            setProgress(20)
            const url = '/api/users/approveusers'; // Replace with your actual URL
            const token = userState.userInfo.token;

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const postData = {
                id: id,
                state: state

            };

            const response = await axios.post(url, postData, { headers });
            setProgress(70)
            if (response.status === 200) {
                //  setComments(response.data)

                const updatedUsers = users.map(user => {
                    if (user._id === id) {
                        return { ...user, verified: state }; // Modify fields as needed
                    }
                    return user;
                });
                setProgress(100)
                setUsers(updatedUsers);
                toast.success("Updated User")
            }

        } catch (error) {
            setProgress(100)

            toast.error("Something went wrong");
            if (error.response && error.response.data.message)
                throw new Error(error.response.data.message);


            throw new Error(error.message);

        }

    };




    const handleNumberChange = (event) => {
        setSelectedNumber(event.target.value);
    };


    const handleSearchKeywordChange = (event) => {
        setSearchKeyword(event.target.value)
    };

    useEffect(() => {

        getUsers()
    }, [currentPage])

    return (
        <>
            <LoadingBar
                color='#007bff'
                progress={progress}
            // onLoaderFinished={() => setProgress(0)}
            />
            <div className="text-gray-900 bg-gray-2300">
                <div className="p-4 flex justify-between">
                    <h1 className="text-3xl">Users</h1>
                    <div className="justify-center md:flex-col items-end p-4 ">
                        <label className="mb-2 font-semibold mx-2">Select Number of Users:</label>
                        <input
                            type="number"
                            className="w-32 p-2 border border-gray-300 rounded mx-2"
                            value={selectedNumber}
                            onChange={handleNumberChange}
                        />
                        <input
                            type="text"
                            placeholder="Search user"
                            className="w-32 p-2 border border-gray-300 rounded mx-2"
                            value={searchKeyword}
                            onChange={handleSearchKeywordChange}
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            onClick={getUsers}
                        >
                            Get
                        </button>


                    </div>

                </div>
                <div className="px-3 py-4 flex justify-center flex-col items-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">Name</th>
                                <th className="text-left p-3 px-5">Email</th>
                                <th className="text-left p-3 px-5">Role</th>
                                <th className="text-left p-3 px-5">Verified</th> {/* Add this column */}
                                <th></th>
                            </tr>
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-b hover:bg-orange-100 bg-gray-100">
                                    <td className="p-3 px-5">
                                        <input type="text" value={user.name} className="bg-transparent" />
                                    </td>
                                    <td className="p-3 px-5">
                                        <input type="text" value={user.email} className="bg-transparent" />
                                    </td>
                                    <td className="p-3 px-5">
                                        {user.admin ? <span className='text-green-600 font-roboto'>Admin</span> : <span className='text-red-500 font-roboto'>User</span>}
                                    </td>
                                    <td className="p-3 px-5">
                                        {user.verified ? (
                                            <button
                                                className="text-green-600"
                                                onClick={() => handleVerificationToggle(false, user._id)}
                                            >
                                                Verified
                                            </button>
                                        ) : (
                                            <button
                                                className="text-red-600"
                                                onClick={() => handleVerificationToggle(true, user._id)}
                                            >
                                                Not Verified
                                            </button>
                                        )}
                                    </td>
                                    <td className="p-3 px-5 flex justify-end">
                                        {user.admin ? "" : <button
                                            onClick={() => { handleDelete(user._id) }}
                                            type="button"
                                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Delete
                                        </button>}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {(
                        <Pagination
                            onPageChange={(page) => setCurrentPage(page)}
                            currentPage={currentPage}
                            totalPageCount={totalPages
                            }
                        />
                    )}
                </div>

            </div>
        </>
    );
};








export default Users;
