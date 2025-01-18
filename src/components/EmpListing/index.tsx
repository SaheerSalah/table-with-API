"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import Image from "next/image";
import Pagination from "../Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Company = {
  name: string;
};
type Users = {
  id: number;
  firstName: string;
  role: "admin" | "moderator" | "user";
  email: string;
  phone: number;
  image: string;
  company: Company;
};
const EmpListing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<string>();
  const [error, setError] = useState(null);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const [activeId, setActiveId] = useState<number | null>(null);
  const toggleOptionsMenu = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  // start pagination
  const [users, setUsers] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // حساب عدد الصفحات
  const totalPages = Math.ceil(users && users.length / rowsPerPage);

  // حساب البيانات التي يجب عرضها في الصفحة الحالية
  const currentData =
    users &&
    users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const api = axios.create({
    baseURL: "https://dummyjson.com",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const deleteUser = async (id: number) => {
    try {
      const response = await api.delete(`/users/${id}`);
      const deletedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers
          ? prevUsers.filter((user: Users) => user.id !== deletedUser.id)
          : []
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const editUser = async (id: number) => {
    try {
      const response = await api.put(`/users/${id}`, {
        firstName: "saheer",
      });
      const editedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user: Users) =>
          user.id === editedUser.id ? editedUser : user
        )
      );
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await api.get(`/users/search`, {
        params: { q: searchTerm },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error search for  user:", error);
    }
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const sortByFirstName = async (order: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users`, {
        params: { sortBy: "firstName", order: order },
      });
      setUsers(response.data.users);
      setSortOrder(order);
    } catch (error) {
      console.error("Error search for  user:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const filterUsers = async (Role: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/filter`, {
        params: { key: "role", value: Role },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error search for  user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSkeleton = () =>
    Array(rowsPerPage)
      .fill(0)
      .map((_, index) => (
        <tr key={index}>
          <td className="p-4">
            <Skeleton width={300} />
          </td>
          <td className="p-4">
            <Skeleton width={200} />
          </td>
          <td className="p-4">
            <Skeleton width={50} />
          </td>
          <td className="p-4">
            <Skeleton width={200} />
          </td>
          <td className="p-4">
            <Skeleton width={50} />
          </td>
        </tr>
      ));
  return (
    <div className="container">
      {/* onClick={() => toggleOptionsMenu(2)} */}
      <div className="">
        <div className="card"></div>
        <div className="mb-2 flex gap-3 overflow-hidden">
          <div className="relative">
            <IoSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="  w-full border  rounded-md border-gray-400 text-gray-700 mr-3 p-1 pl-7"
            />
          </div>
          <div className="flex gap-3 ">
            <select
              className="bg-gray-100 border rounded-md p-1 w-auto "
              onChange={(e) => filterUsers(e.target.value)}
            >
              <option className="" value="">
                All Roles
              </option>
              <option className="" value="admin">
                Admin
              </option>
              <option className="" value="moderator">
                Moderator
              </option>
              <option className="" value="user">
                User
              </option>
            </select>
          </div>
        </div>
        <div className="mx-auto mb-16 relative overflow-x-auto">
          {/* border-collapse border  border-slate-400 */}
          <table className="  font-sans shadow-lg w-full min-w-max table-auto text-gray-500 ">
            {/* <caption className="caption-top mb-4">
              Table 3.1: Professional Employee Listing.
            </caption> */}
            <thead className="text-gray-700 uppercase ">
              <tr className="bg-gray-100  ">
                {/* <th className="px-10 border-b border-slate-300">ID</th> */}
                <th className=" p-3 font-semibold border-b border-slate-300 text-start">
                  <div className="flex">
                    <span>NAME </span>
                    <div className="text-gray-400">
                      <span
                        className={`cursor-pointer ${
                          sortOrder === "asc" ? "text-gray-700" : ""
                        }`}
                        onClick={() => sortByFirstName("asc")}
                      >
                        <FaSortUp />
                      </span>
                      <span
                        className={`cursor-pointer ${
                          sortOrder === "desc" ? "text-gray-700" : ""
                        }`}
                        onClick={() => sortByFirstName("desc")}
                      >
                        <FaSortDown />
                      </span>
                    </div>
                  </div>
                </th>
                {/* <th className="px-10 border border-slate-300">EMAIL</th> */}
                <th className="p-3 font-semibold border-b border-slate-300 text-start">
                  PHONE
                </th>
                <th className="p-3 font-semibold border-b border-slate-300 text-start">
                  ROLE
                </th>
                <th className="p-3 font-semibold border-b border-slate-300 text-start">
                  company
                </th>
                <th className="p-3 font-semibold border-b border-slate-300 text-start">
                  Menu
                </th>
              </tr>
            </thead>
            <tbody className="">
              {isLoading
                ? renderSkeleton()
                : currentData &&
                  currentData.map((data: Users) => (
                    <tr
                      key={data.id}
                      className="odd:bg-white even:bg-gray-50 cursor-pointer"
                    >
                      {/* <td className="p-1 border-b border-slate-300">{data.id}</td> */}
                      <td className=" p-3 text-start border-b border-slate-300">
                        <div className="flex  gap-2 items-center">
                          <div>
                            <Image
                              src={data.image}
                              alt="user image"
                              width={30}
                              height={30}
                            />
                          </div>
                          <div className=" flex flex-col">
                            <span className="text-gray-900 font-medium">
                              {data.firstName}
                            </span>
                            <span className="text-sm">{data.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-start border-b border-slate-300">
                        {data.phone}
                      </td>
                      <td className="p-3 border-b border-slate-300 ">
                        {/* "p-1 border border-[#dc2626] bg-[#fee2e2] rounded-full w-24 h-8" */}
                        <div>{data.role}</div>
                      </td>
                      <td className="p-3 text-start border-b border-slate-300">
                        {data.company?.name || "Not Available"}

                        <div></div>
                      </td>
                      <td className="relative p-3 space-x-5 text-center border-b border-slate-300">
                        <button
                          className="cursor-pointer "
                          onClick={() => toggleOptionsMenu(data.id)}
                        >
                          ...
                        </button>
                        {activeId === data.id && (
                          <div
                            className={`absolute grid grid-cols-1 w-28 border-[1px] rounded shadow-lg bg-white left-0.5 transform -translate-x-2/3  z-10 `}
                          >
                            <ul className="">
                              <li
                                className="p-2 py-1 grid grid-cols-2 space-x-0 cursor-pointer  text-red-600  hover:bg-gray-100 "
                                onClick={() => deleteUser(data.id)}
                              >
                                {" "}
                                <MdModeEdit />
                                delete
                              </li>
                              <li
                                className=" text-gray-700 p-2 py-1 grid grid-cols-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => editUser(data.id)}
                              >
                                <FaTrashAlt /> edit
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default EmpListing;

// the end

// <div className="relative inline-block w-64">
//       <button
//         className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//         onClick={toggleDropdown}
//         value={selectedOption}
//         onChange={(e) => filterUsers(e.target.value)}
//       >
//         {selectedOption || "Select an option"}
//       </button>
//       {isOpen && (
//         <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
//         <li
//             className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//             onClick={() => selectOption("admin")}
//             value="admin"
//           >
//             Admin
//           </li>
//           <li
//             className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//             onClick={() => selectOption("moderator")}
//             value="moderator"
//           >
//             Moderator
//           </li>
//           <li
//             className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//             onClick={() => selectOption("user")}
//             value="user"
//           >
//             User
//           </li>
//         </ul>
//       )}
//     </div>

{
  /*  */
}

{
  /* <div
            className="relative"
          >
            <div className="cursor-pointer p-2 border border-gray-300 rounded-md bg-white">
              Select an option
            </div>
            <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
              <li className="p-2 py-1 grid grid-cols-2 space-x-0 cursor-pointer  text-red-600  hover:bg-gray-100 ">
                delete
              </li>
              <li className=" text-gray-700 p-2 py-1 grid grid-cols-2 cursor-pointer hover:bg-gray-100">
                edit
              </li>
            </ul>
          </div> */
}

{
  /* <div className="relative">
            <div className="cursor-pointer p-2 border border-gray-300 rounded-md bg-white">
              Select an option
            </div>
            <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
              <div className="p-2 hover:bg-gray-100">Admin</div>
              <div className="p-2 hover:bg-gray-100">Moderator</div>
              <div className="p-2 hover:bg-gray-100">User</div>
            </div>
          </div> */
}

// useEffect(() => {
//   fetch("https://dummyjson.com/users")
//     .then((res) => res.json())
//     .then((data) => setData(data.users))
//     .catch((error) => console.error("Failed to fetch users:", error));
// }, []);

// className={`inline-block items-center px-1   border rounded-full font-medium  ${
//   data.role == "admin"
//     ? ` border-[#dc2626] bg-[#fee2e2] text-[#dc2626]  `
//     : data.role == "moderator"
//     ? ` border-[#047857] bg-[#a7f3d0] text-[#047857]`
//     : ` border-[#1d4ed8] bg-[#bfdbfe] text-[#1d4ed8]`
// }`}

// return (
//   <table className="w-full text-left border">
//     <thead>
//       <tr>
//         <th className="p-3 font-semibold border-b border-slate-300 text-start">NAME</th>
//         <th className="p-3 font-semibold border-b border-slate-300 text-start">PHONE</th>
//         <th className="p-3 font-semibold border-b border-slate-300 text-start">ROLE</th>
//         <th className="p-3 font-semibold border-b border-slate-300 text-start">COMPANY</th>
//         <th className="p-3 font-semibold border-b border-slate-300 text-start">Menu</th>
//       </tr>
//     </thead>
//     <tbody>
//       {Array(5).fill(0).map((_, index) => (
//         <SkeletonRow key={index} />
//       ))}
//     </tbody>
//   </table>
// );

// const rowsPerPage = 6;
// const [data, setData] = useState([]);
// const [currentData, setCurrentData] = useState([]);
// const [currentPage, setCurrentPage] = useState(1);
// const endIndex = currentPage * rowsPerPage;
// const startIndex = endIndex - rowsPerPage;
// const totalPages = data.length / rowsPerPage;
// const [num, setNum] = useState(1);

// useEffect(() => {
//   fetch("https://dummyjson.com/users")
//     .then((responsive) => responsive.json())
//     .then((data) => {
//       const users = data.users;
//       setData(users);
//       if (users.length > 0) {
//         setCurrentData(users.slice(startIndex, endIndex));
//       }
//     })
//     .catch((err) => {
//       console.log("errorrrrrr");
//     });
// }, [currentPage, num]);

// const GoPrevious = (): void => {
//   if (currentPage > 1) {
//     setCurrentPage((prev) => prev - 1);
//     setNum((prev) => (prev > 1 ? prev - 1 : prev));
//   }
// };

// const GoNext = (): void => {
//   if (currentPage < totalPages) {
//     setCurrentPage(currentPage + 1);
//   }
//   if (num < totalPages - 2) {
//     setNum(num + 1);
//   }

// };
// const handleCurrentPage = (value: number): void => {
//   if (value >= 1 && value <= totalPages) {
//     setCurrentPage(value);
//   }
// };

// const GoPrevious = (): void => {
//   if (currentPage > 1) {
//     setCurrentPage((prev) => prev - 1);
//     setNum((prev) => (prev > 1 ? prev - 1 : prev));
//   }
// };

// const GoNext = (): void => {
//   if (currentPage < totalPages) {
//     setCurrentPage((prev) => prev + 1);
//     if (num < totalPages - 2) {
//       setNum((prev) => prev + 1);
//     }
//   }
// };

// const MarkASCurrentPage = (value: number): void => {
//   if (value >= 1 && value <= totalPages) {
//     setCurrentPage(value);
//   }
// };

{
  /* <div className="flex items-center">
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`px-3 py-1 border border-gray-300  mx-1 ${
                  currentPage == num ? "bg-gray-200" : ""
                }`}
                onClick={() => MarkASCurrentPage(num)}
              >
                {num}

              </button>

              <button
                className={`px-3 py-1 border border-gray-300  mx-1 ${
                  currentPage == num+1  ? "bg-gray-200" : ""
                }`}
                onClick={() => MarkASCurrentPage(num+1)}
              >
                {num+1}
                </button>
              <button
                className={`px-3 py-1 border border-gray-300  mx-1 ${
                  currentPage == num+2 ? "bg-gray-200" : ""
                }`}
                onClick={() => MarkASCurrentPage(num+2)}
              >
                {num+2}
              </button>
            </div> */
}

{
  /* <div className="flex items-center">
              {[num, num + 1, num + 2].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 border border-gray-300 mx-1 ${
                    currentPage === page ? "bg-gray-200" : ""
                  }`}
                  onClick={() => MarkASCurrentPage(page)}
                  disabled={page > totalPages}
                >
                  {page}
                </button>
              ))}
            </div> */
}
