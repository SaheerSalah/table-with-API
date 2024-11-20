"use client";
import React, { useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import Pagination from "../Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Company = {
  name: string;
};
type users = {
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
  const [error, setError] = useState(null);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const [activeId, setActiveId] = useState<number | null>(null);
  const toggleOptionsMenu = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  // start pagination
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // حساب عدد الصفحات
  const totalPages = Math.ceil(users.length / rowsPerPage);

  // حساب البيانات التي يجب عرضها في الصفحة الحالية
  const currentData = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const result = await response.json();
        setUsers(result.users);
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
      const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }
      const deletedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers
          ? prevUsers.filter((user: users) => user.id !== deletedUser.id)
          : []
      );
    } catch (error) {
      console.error("Error deleting user:", error);
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
      <div className="">
        <div className="card"></div>
        <div className="mx-auto mb-16 relative overflow-x-auto">
          {/* border-collapse border  border-slate-400 */}
          <table className="  font-sans shadow-lg w-full min-w-max table-auto text-gray-500 ">
            <caption className="caption-top mb-4">
              Table 3.1: Professional Employee Listing.
            </caption>
            <thead className="text-gray-700 uppercase ">
              <tr className="bg-gray-100  ">
                {/* <th className="px-10 border-b border-slate-300">ID</th> */}
                <th className="p-3 font-semibold border-b border-slate-300 text-start">
                  NAME
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
                : currentData.map((data: users) => (
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
                              <li className=" text-gray-700 p-2 py-1 grid grid-cols-2 cursor-pointer hover:bg-gray-100">
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
