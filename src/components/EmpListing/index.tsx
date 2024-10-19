"use client";
import React, { useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";



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
  // start pagination
  const rowsPerPage = 4;
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const endIndex = currentPage*rowsPerPage;
  const startIndex = endIndex-rowsPerPage;




 

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((responsive) => responsive.json())
      .then((data) => {
        const users = data.users;
        setData(users);
        if (users.length > 0) {
          setCurrentData(users.slice(startIndex,endIndex));
        }
      })
      .catch((err) => {
        console.log("errorrrrrr");
      });
  }, [currentPage]);


  const GoPrevious=():void=>{
    if(currentPage==1){
      return;
    }
    setCurrentPage(currentPage-1);
  }
  const GoNext=():void=>{
    if(data.length<endIndex){
      return;
    }
    setCurrentPage(currentPage+1);
  }

  // const GoPrevious = (): void => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  
  // const GoNext = (): void => {
  //   if (endIndex < data.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  
  
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
              {currentData.map((data: users) => (
                <tr key={data.id} className="odd:bg-white even:bg-gray-50">
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

                  {/* <td className="p-1 text-start border border-slate-300">
                    {data.email}
                  </td> */}
                  <td className="p-3 text-start border-b border-slate-300">
                    {data.phone}
                  </td>
                  <td className="p-3 border-b border-slate-300 ">
                    {/* "p-1 border border-[#dc2626] bg-[#fee2e2] rounded-full w-24 h-8" */}
                    <div
                      className={`inline-block items-center px-1   border rounded-full font-medium  ${
                        data.role == "admin"
                          ? ` border-[#dc2626] bg-[#fee2e2] text-[#dc2626]  `
                          : data.role == "moderator"
                          ? ` border-[#047857] bg-[#a7f3d0] text-[#047857]`
                          : ` border-[#1d4ed8] bg-[#bfdbfe] text-[#1d4ed8]`
                      }`}
                    >
                      {data.role}
                    </div>
                  </td>
                  <td className="p-3 text-start border-b border-slate-300">
                    {data.company?.name || "Not Available"}
                  </td>
                  <td className="p-3 space-x-5 text-center border-b border-slate-300">
                    {/* <button className="">
                      <MdModeEdit />
                    </button>
                    <button className="text-red-600">
                      <FaTrashAlt />
                    </button> */}
                    <button className="">...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4">
            <button className="px-3 py-2 bg-gray-200 text-gray-600  hover:bg-gray-300 duration-300"onClick={GoPrevious}>
              <GrPrevious />
            </button>
            <div className="flex items-center">
              <span className="mx-2">Page {currentPage} of 10</span>
              <button className="px-3 py-1 border border-gray-300  mx-1">
                {currentPage}
              </button>
              {/* <button className="px-3 py-1 border border-gray-300  mx-1">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300  mx-1">
                3
              </button> */}
              {/* يمكنك إضافة المزيد من الأزرار حسب الحاجة */}
            </div>
            <button className="px-3 py-2 bg-gray-200 text-gray-600  hover:bg-gray-300 duration-300" onClick={GoNext}>
              <GrNext />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
