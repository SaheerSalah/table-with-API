"use client";
import React, { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";


type Address = {
  address: string,
  city: string,
  state: string,
}
type users = {
  id : number ;
  firstName : string;
  email : string;
  phone : number;
  address : Address;
}
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
                <th className="px-10 border border-slate-300">EMAIL</th>
                <th className="px-10 border border-slate-300">PHONE</th>
                <th className="px-10 border border-slate-300">ADDRESS</th>
                <th className="px-10 border border-slate-300">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data:users) => (
                <tr>
                  <td className="p-1 border border-slate-300">{data.id}</td>
                  <td className="p-1 text-start border border-slate-300">{data.firstName}</td>
                  <td className="p-1 text-start border border-slate-300">{data.email}</td>
                  <td className="p-1 text-start border border-slate-300">{data.phone}</td>
                  <td className="p-1 text-start border border-slate-300">{data.address?.city|| "Not Available"}</td>
                  <td className=" space-x-5 text-center border border-slate-300">
                    <button className=""><MdModeEdit /></button>
                    <button className="text-red-600"><FaTrashAlt /></button>
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
