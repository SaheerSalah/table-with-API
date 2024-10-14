"use client";
import React, { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";

// type Address = {
//   address: string;
//   city: string;
//   state: string;
// };
type Company = {
  name: string;
};
type users = {
  id: number;
  firstName: string;
  role: string;
  email: string;
  phone: number;
  image: string;
  company: Company;
};
const EmpListing = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((responsive) => responsive.json())
      .then((data) => setData(data.users))
      .catch((err) => {
        console.log("errorrrrrr");
      });
  }, []);

  return (
    <div className="container">
      <div className="text-center">
        <div className="card"></div>
        <div className="table mx-auto">
          <table className="border-collapse border  border-slate-400">
            <caption className="caption-top">
              Table 3.1: Professional Employee Listing.
            </caption>
            <thead>
              <tr className="bg-gray-100">
                <th className="px-10 border border-slate-300">ID</th>
                <th className="px-10 border border-slate-300">NAME</th>
                {/* <th className="px-10 border border-slate-300">EMAIL</th> */}
                <th className="px-10 border border-slate-300">PHONE</th>
                <th className="px-10 border border-slate-300"> User ROLE</th>
                <th className="px-10 border border-slate-300">company</th>
                <th className="px-10 border border-slate-300">Menu</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data: users) => (
                <tr key={data.id}>
                  <td className="p-1 border border-slate-300">{data.id}</td>
                  <td className="flex gap-2 items-center p-1 text-start border border-slate-300">
                    <div>
                      <Image
                        src={data.image}
                        alt="user image"
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className=" flex flex-col">
                      <span>{data.firstName}</span>
                      <span className="text-gray-500 text-sm">
                        {data.email}
                      </span>
                    </div>
                  </td>
                  

                  {/* <td className="p-1 text-start border border-slate-300">
                    {data.email}
                  </td> */}
                  <td className="p-1 text-start border border-slate-300">
                    {data.phone}
                  </td>
                  <td className=" p-1  border border-slate-300 ">
                    {/* "p-1 border border-[#dc2626] bg-[#fee2e2] rounded-full w-24 h-8" */}
                    <div
                      className={`flex items-center justify-center text-center px-1 border rounded-full font-medium  w-24 h-8 ${data.role == "admin"
                          ? ` border-[#dc2626] bg-[#fee2e2] text-[#dc2626]  `
                          : data.role == "moderator"
                          ? ` border-[#047857] bg-[#a7f3d0] text-[#047857]`
                          : ` border-[#1d4ed8] bg-[#bfdbfe] text-[#1d4ed8]`}` }
                    >
                      {data.role}
                    </div>
                  </td>
                  <td className="p-1 text-start border border-slate-300">
                    {data.company?.name || "Not Available"}
                  </td>
                  <td className=" space-x-5 text-center border border-slate-300">
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
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
