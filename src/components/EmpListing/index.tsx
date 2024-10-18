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
  role: 'admin'|'moderator'|'user';
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
        <div className="mx-auto mb-16 relative overflow-x-auto">
        {/* border-collapse border  border-slate-400 */}
          <table className=" font-sans shadow-lg w-full min-w-max table-auto text-gray-500 ">
            <caption className="caption-top">
              Table 3.1: Professional Employee Listing.
            </caption>
            <thead className="text-gray-700 uppercase">
              <tr className="bg-gray-100">
                {/* <th className="px-10 border-b border-slate-300">ID</th> */}
                <th className="px-10 border-b border-slate-300">NAME</th>
                {/* <th className="px-10 border border-slate-300">EMAIL</th> */}
                <th className="px-10 border-b border-slate-300">PHONE</th>
                <th className="px-10 border-b border-slate-300"> User ROLE</th>
                <th className="px-10 border-b border-slate-300">company</th>
                <th className="px-10 border-b border-slate-300">Menu</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((data: users) => (
                <tr key={data.id} className="odd:bg-white even:bg-gray-50">
                  {/* <td className="p-1 border-b border-slate-300">{data.id}</td> */}
                  <td className="  p-1 px-10 text-start border-b border-slate-300">
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
                      <span className="text-gray-900 font-medium">{data.firstName}</span>
                      <span className="text-sm">
                        {data.email}
                      </span>
                    </div>

                    </div>
                    
                  </td>
                  

                  {/* <td className="p-1 text-start border border-slate-300">
                    {data.email}
                  </td> */}
                  <td className="p-1 text-start border-b border-slate-300">
                    {data.phone}
                  </td>
                  <td className=" p-1  border-b border-slate-300 ">
                    {/* "p-1 border border-[#dc2626] bg-[#fee2e2] rounded-full w-24 h-8" */}
                    <div
                      className={`flex items-center justify-center text-center px-1 border rounded-full font-medium  w-[100%] h-8 ${data.role == "admin"
                          ? ` border-[#dc2626] bg-[#fee2e2] text-[#dc2626]  `
                          : data.role == "moderator"
                          ? ` border-[#047857] bg-[#a7f3d0] text-[#047857]`
                          : ` border-[#1d4ed8] bg-[#bfdbfe] text-[#1d4ed8]`}` }
                    >
                      {data.role}
                    </div>
                  </td>
                  <td className="p-1 text-start border-b border-slate-300">
                    {data.company?.name || "Not Available"}
                  </td>
                  <td className=" space-x-5 text-center border-b border-slate-300">
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
