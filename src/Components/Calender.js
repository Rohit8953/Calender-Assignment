import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { datas, dayOfWeekNames, monthsofYear } from "../Data.js/calenderdata";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { geteventdetail } from "../Redux/eventSlice";
import { daysofweek } from "../Data.js/calenderdata";

const Calender = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentDate = new Date();
  const [currentMonth, setcurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setcurrentYear] = useState(currentDate.getFullYear());
  const [showpopup, setshowpopup] = useState(false);
  const [eventtext, setevntext] = useState();
  const [idx, setidx] = useState(0);
  const daysinmonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstdaysinmonth = new Date(currentYear, currentMonth, 1).getDay();
  const [eventsname, seteventsname] = useState("");
  const [datamonthyear, setdatemonthyear] = useState(new Date(2024, 7, 5));
  const [data, setdata] = useState(datas);

  const previousMonth = () => {
    setcurrentMonth((prevmonth) => (prevmonth === 0 ? 11 : prevmonth - 1));
    setcurrentYear((prevyear) =>
      currentMonth === 0 ? prevyear - 1 : prevyear
    );
  };

  const nextMonth = () => {
    setcurrentMonth((nextmonth) => (nextmonth === 11 ? 0 : nextmonth + 1));
    console.log("month is t---- ", currentMonth);
    setcurrentYear((nextyear) =>(currentMonth === 11 ? nextyear + 1 : nextyear));
  };

  console.log("current year", currentYear);
  useEffect(() => {
    if (currentYear === 2025) {
      setidx(1);
    } else {
      setidx(0);
    }
  }, [currentYear]);

  const openpopup = (day) => {
    const clickeddate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    if (clickeddate >= today) {
      setshowpopup(true);
    }
  };

  const handleeventSubmit = () => {
    if (!eventsname || !eventtext) {
      return;
    }
    const newdata = [...data];
    console.log(
      "length",
      data[idx][currentYear],
      "year",
      currentYear
    );
    const items = {
      id: data[idx][currentYear].length,
      title: eventsname,
      description: eventtext,
      date: datamonthyear.getDate(),
      month: datamonthyear.getMonth(),
    };

    newdata[idx][currentYear].push(items);

    setdata(newdata);
  };

  const deletehandler = (id, year, index) => {
    const newData = [...data];
    newData[index][year] = newData[index][year].filter(
      (item) => item.id !== id
    );
    setdata(newData);
  };

  const Navigatehandler = (eventdata) => {
    console.log("event data is there", eventdata);
    dispatch(geteventdetail(eventdata));
    navigate("/eventdetail");
  };

  return (
    <div className="w-[100%] h-full min-h-[100vh] py-2 overflow-hidden  flex-col font-thin bg-gray-200 flex items-center justify-center">
      <div className="w-[95%] md:w-[80%] h-full md:h-[90vh] overflow-hidden border-2 flex flex-col md:flex-row backdrop-filter backdrop-blur-lg rounded-lg px-4 py-10 bg-white shadow-lg sm:rounded-3xl bg-clip-padding bg-opacity-60 border-gray-200">
        {/* // ---Calender--- */}
        <div className=" w-[100%] md:w-[60%] ">
          <h1 className="text-4xl font-serif font-semibold mx-auto">
            Calender
          </h1>
          <div className="flex flex-row justify-between my-4">
            <div className="flex flex-row gap-4 items-center justify-between w-full">
              <div
                onClick={previousMonth}
                className="bg-cyan-400 cursor-pointer rounded-full p-1 hover:bg-cyan-200 transition-all delay-200"
              >
                <FaChevronLeft className="" />
              </div>
              <div className="flex">
                <h1 className="uppercase text-sm font-semibold text-gray-600">
                  {monthsofYear[currentMonth]}-
                </h1>
                <h1 className="uppercase text-sm font-semibold text-gray-600">
                  {currentYear}
                </h1>
              </div>
              <div
                onClick={nextMonth}
                className="bg-cyan-400 cursor-pointer rounded-full p-1 hover:bg-cyan-200 transition-all delay-200"
              >
                <FaChevronLeft className="rotate-180" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 mt-5">
            {daysofweek.map((day) => {
              return (
                <span
                  className=" sm:font-semibold px-3 border rounded-sm w-10 sm:w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md"
                  key={day}
                >
                  {day}
                </span>
              );
            })}
          </div>
          <div className="grid grid-cols-7 mt-2 sm:gap-1 ">
            {[...Array(firstdaysinmonth).keys()].map((_, index) => (
              <span key={`empty-${index}`} />
            ))}

            {[...Array(daysinmonth).keys()].map((day) => (
              <span
                key={day + 1}
                onClick={() => openpopup(day + 1)}
                className={
                  day + 1 === currentDate.getDate() &&
                  currentMonth === currentDate.getMonth() &&
                  currentYear === currentDate.getFullYear()
                    ? "bg-cyan-400 mt-4 font-semibold px-1 w-10 sm:w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer"
                    : "font-semibold px-1 mt-4 w-10 sm:w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer"
                }
              >
                {day + 1}
              </span>
            ))}
          </div>
        </div>

        {/* // Add, delete, edite and filter out events */}

        <div className="w-[100%] pl-0 md:pl-2  md:w-[40%] mt-10 md:mt-0">
          <h1 className="text-xl font-serif">
            Select future data to add event
          </h1>
          {showpopup && (
            <div className="flex  flex-col text-black ">
              <input
                type="text"
                placeholder="Enter Event name"
                className="outline-none my-2 rounded-sm px-1"
                onChange={(e) => seteventsname(e.target.value)}
                required
              />

              <textarea
                className="outline-none w-full rounded-sm px-1"
                placeholder="Enter Event Description"
                required
                onChange={(e) => {
                  setevntext(e.target.value);
                }}
              ></textarea>
              <button
                className="bg-cyan-400 px-2 p-1 rounded-sm"
                onClick={handleeventSubmit}
              >
                {" "}
                Add Event{" "}
              </button>
            </div>
          )}

          {/* all events */}

          <div className="mt-2 h-full overflow-y-auto">
            {data.map((event, index) => (
              <div key={index}>
                {event[currentYear] && (
                  <div>
                    {event[currentYear].map((events) => {
                      return (
                        <div
                          key={events.id}
                          className="relative p-2 mt-2 w-full flex overflow-hidden border bg-slate-200 border-slate-100 rounded-lg justify-between"
                        >
                          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
                          <div className="w-[65%] relative">
                            <div
                              onClick={() => Navigatehandler(events)}
                              className="h-full w-full cursor-pointer"
                            >
                              <div className="text-3xl font-light font-serif">
                                {events.title}
                              </div>
                              <div className="shrink font-light line-clamp-2">
                                {events.description}
                              </div>
                            </div>
                            <div className="flex flex-row absolute -right-3 bottom-3">
                              <MdOutlineDelete
                                onClick={() =>
                                  deletehandler(events.id, currentYear, index)
                                }
                                className="text-2xl text-gray-600 hover:text-green-500 cursor-pointer"
                              />
                            </div>
                          </div>
                          <div class=" h-fit min-w-[6rem] w-[30%] pb-1 bg-white rounded-md p-1 mb-1 font-medium">
                            <div
                              className="cursor-pointer"
                              onClick={() => Navigatehandler(events)}
                            >
                              <div class=" flex-none rounded-l text-center shadow-lg ">
                                <div class="rounded-t overflow-hidden  text-center ">
                                  <div class="bg-cyan-400 text-white py-1">
                                    {`${monthsofYear[events.month]}`}
                                  </div>
                                  <div class="pt-1 border-l border-r border-white bg-white">
                                    <span class=" font-bold leading-tight">
                                      {events.date}
                                    </span>
                                  </div>
                                  <div class="border-l border-r mb-3 border-b rounded-b-lg text-center border-white bg-white ">
                                    <span className="text-sm">
                                      {
                                        dayOfWeekNames[
                                          new Date(
                                            currentYear,
                                            events.month,
                                            events.date
                                          ).getDay()
                                        ]
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
