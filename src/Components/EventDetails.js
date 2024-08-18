import React from "react";
import { useSelector } from "react-redux";
import { monthsofYear } from "../Data.js/calenderdata";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const eventdata = useSelector((state) => state.event.eventdetail);
  console.log("rohit ji", eventdata);
  return (
    <div className="w-[100%] h-[100vh] relative flex  flex-row items-center ">
      <div className="absolute inset-x-0 left-0 h-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
      <div className="w-[95%] mx-auto flex flex-col md:flex-row  md:w-[80%] h-fit overflow-hidden border-2  backdrop-filter backdrop-blur-lg rounded-lg p-5 sm:p-10 gap-5 bg-white shadow-lg sm:rounded-3xl bg-clip-padding bg-opacity-60 border-gray-200">
        <div className="flex flex-col gap-10 ">
          <p className="text-4xl md:text-6xl font-serif font-light">
            {eventdata.title}
          </p>
          
          <p className="text-2xl font-light">{eventdata.description}</p>
          <span className="flex flex-row justify-between">
            <span className="flex flex-row gap-2">
              <p className="text-2xl font-light">{eventdata.date}</p>
              <p className="text-2xl font-light">
                {monthsofYear[eventdata.month]}
              </p>
            </span>
            <Link
              to="/"
              className="px-3 py-1 bg-indigo-500 w-fit text-white cursor-pointer  rounded-md sm:w-auto"
            >
              {" "}
              Go Back{" "}
            </Link>
          </span>
        </div>
        <div className="rounded-lg ">
          <img className="rounded-3xl" src={eventdata.image}></img>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;


