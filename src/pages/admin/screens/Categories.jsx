import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import LoadingBar from 'react-top-loading-bar';
import Pagination from '../../../components/Pagination';
import Swal from 'sweetalert2';

const Categories = () => {
    const [progress, setProgress] = useState(0)

    const [categories, setCategories] = useState([])


    const getCategories = async () => {
        try {
            setProgress(20)
            const url = '/api/cat/allcategories'; // Replace with your actual URL
            const token = userState.userInfo.token;

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            setProgress(40)

            const postData = {
                limit: 10,
                page: currentPage,
                searchKeyword: searchKeyword,
            };


            const response = await axios.post(url, postData, { headers });
            setProgress(80)

            if (response.status === 200) {
                setCategories(response.data.categories);

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





    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // 
    const userState = useSelector((state) => state.user);
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearchKeywordChange = (event) => {
        setSearchKeyword(event.target.value)
    };
    const handleEdit = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Enter new name",
            icon: 'primary',
            input: "text",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update!'
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {
                    setProgress(20)
                    const url = '/api/cat/edit'; // Replace with your actual URL
                    const token = userState.userInfo.token;

                    const headers = {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    };

                    const postData = {
                        id: id,
                        name: result.value

                    };

                    const response = await axios.post(url, postData, { headers });
                    setProgress(70)

                    if (response.status === 200) {
                        const updatedCategories = categories.map(cat => {
                            if (cat._id === id) {
                                return { ...cat, name: response.data.name }; // Modify fields as needed
                            }
                            return cat;
                        });
                        setProgress(100)
                        setCategories(updatedCategories);

                        toast.success("Updated to  " + response.data.name)

                        Swal.fire(
                            'Update!',
                            'category has been update.',
                            'success'
                        )
                    }
                    setProgress(100)

                } catch (error) {
                    toast.error("Something went wrong");
                    setProgress(100)

                    if (error.response && error.response.data.message)
                        throw new Error(error.response.data.message);


                    throw new Error(error.message);

                }


            }
        })

    }

    const handleCreate = () => {

        Swal.fire({
            title: 'Create new Category?',
            text: "Enter  name",
            icon: 'primary',
            input: "text",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Create!'
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {
                    setProgress(20)
                    const url = '/api/cat/create'; // Replace with your actual URL
                    const token = userState.userInfo.token;

                    const headers = {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    };

                    const postData = {

                        name: result.value

                    };

                    const response = await axios.post(url, postData, { headers });
                    setProgress(70)

                    if (response.status === 200) {

                        setProgress(100)
                        setCategories(prevCategories => [...prevCategories, response.data]);

                        toast.success("Added  " + response.data.name)

                        Swal.fire(
                            'Created!',
                            'category has been Created.',
                            'success'
                        )
                    }
                    setProgress(100)

                } catch (error) {
                    toast.error("Something went wrong");
                    setProgress(100)

                    if (error.response && error.response.data.message)
                        throw new Error(error.response.data.message);


                    throw new Error(error.message);

                }


            }
        })

    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "it will delete all posts with this category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {



                try {
                    setProgress(20)
                    const url = '/api/cat/delete'; // Replace with your actual URL
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

                        const updatedCategories = categories.filter(cat => cat._id !== response.data._id);
                        setCategories(updatedCategories);
                        toast.success("Deleted " + response.data.name)

                        Swal.fire(
                            'Deleted!',
                            response.data.name + ' has been deleted.',
                            'success'
                        )
                    }
                    setProgress(100)

                } catch (error) {
                    toast.error("Something went wrong");
                    setProgress(100)

                    if (error.response && error.response.data.message)
                        throw new Error(error.response.data.message);


                    throw new Error(error.message);

                }

            }
        })
    }
    useEffect(() => {
        getCategories()
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
                    <h1 className="text-3xl">Categories</h1>

                    <div className="justify-center md:mt-4 md:flex items-end p-4 ">

                        <label className="mb-2 mt-2 font-semibold mx-2">Search Category:</label>

                        <input
                            type="text"
                            placeholder="Search category"
                            className="w-32 mt-2 p-2 border border-gray-300 rounded mx-2"
                            value={searchKeyword}
                            onChange={handleSearchKeywordChange}
                        />
                        <button
                            className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            onClick={getCategories}
                        >
                            Search
                        </button>
                        <button
                            onClick={handleCreate}
                            className="bg-blue-500 mt-2 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded"
                        >
                            Create
                        </button>

                    </div>

                </div>
                <div className="px-3 py-4 flex justify-center flex-col items-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">Name</th>

                                <th></th>
                            </tr>
                            {categories.map((cat, index) => (
                                <tr key={cat._id} className="border-b hover:bg-orange-100 bg-gray-100">
                                    <td className="p-3 px-5">
                                        <input type="text" value={cat.name} className="bg-transparent" />
                                    </td>
                                    <td>
                                        <button
                                            className="text-red-600"
                                            onClick={() => handleDelete(cat._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="text-primary"
                                            onClick={() => handleEdit(cat._id)}
                                        >
                                            Edit
                                        </button>
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

            </div></>
    )
}

export default Categories
