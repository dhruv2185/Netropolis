import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCredentials, setTokens } from "../features/slices/authSlice";
import AppLoader from "../utils/AppLoader";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { PlusIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { useLoginMutation } from "../features/slices/usersApiSlice";
import Button from "../components/globals/Button";
import Title from "../components/globals/Title";
import navigations from "../data/navigations.json";
import Header from "../components/globals/Header";
import mesh from "../assets/images/mesh.png";
import { AppError } from "../utils/AppError";
import Footer from "../components/globals/Footer";

const ScheduleQuestPage = () => {

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate("/");
    //     }
    // }, [navigate, userInfo]);

    const [appInfo, setAppInfo] = useState({})

    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

    const { questId } = useParams();
    const navigate = useNavigate();

    const { userInfo, tokens } = useSelector((state) => state.auth);

    const [schedule, setSchedule] = useState({
        start_date: "",
        end_date: "",
        questId: questId,

    })

    const [days, setDays] = useState([
        {
            date: "",
            events: [
                {
                    name: "",
                    from: "",
                    to: "",
                    description: "",
                    location: ""
                }
            ]
        }
    ])

    useEffect(() => {
        // Application Data from props
        // Quest Data - fetchQuestData
        // questId - miljayegi useParams se HOPEFULLY
    }, []);

    // start date 
    // end date
    // day to day Schedule 
    //           date, add event -> event info { name, from, to, description, location}

    const addDay = (e) => {
        e.preventDefault();
        setDays([...days, {
            date: "",
            events: [
                {
                    name: "",
                    from: "",
                    to: "",
                    description: "",
                    location: ""
                }
            ]
        }])
    }

    const removeDay = (e, index) => {
        e.preventDefault();
        let newDays = [...days];
        newDays.splice(index, 1);
        setDays(newDays);
    }

    const addEvent = (e, index) => {
        e.preventDefault();
        let newDays = [...days];
        newDays[index].events.push({
            name: "",
            from: "",
            to: "",
            description: "",
            location: ""
        })
        setDays(newDays);
    }

    const removeEvent = (e, index, ind) => {
        e.preventDefault();
        let newDays = [...days];
        newDays[index].events.splice(ind, 1);
        setDays(newDays);
    }


    const handleMainInputChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value });
    }

    const handleDayInputChange = (e, index) => {
        let newDays = [...days];
        newDays[index][e.target.name] = e.target.value;
        setDays(newDays);
    }

    const handleEventInputChange = (e, index, ind) => {
        let newDays = [...days];
        newDays[index].events[ind][e.target.name] = e.target.value;
        setDays(newDays);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <><Header navigations={navigations} />
            <div className="flex bg-transparent h-auto w-full" >
                {/* left side */}
                <div className="sm:flex justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                    <div className="flex flex-col h-auto min-h-[100vh] w-full flex-1 mb-5 mt-32">
                        {/* <div className="flex justify-end p-1"></div> */}

                        <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                            <p className="font-fira text-medium text-4xl text-indigo-400">
                                Create Team
                            </p>
                            <p className="mb-2">Embark on your quest with a TEAM or go SOLO  </p>
                        </div>

                        {<AppError />}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="flex flex-col xl:flex-row pr-2 pl-2 justify-center items-center w-full">
                                <div className="xl:w-[50%] lg:w-[50%] w-full flex flex-col items-center justify-center xl:self-start gap-4">
                                    <div className="flex flex-row gap-10">
                                        <div className="w-full">
                                            <p className="text-indigo-400 font-inter mb-[4px]">Start Date</p>
                                            <input
                                                type="date"
                                                name="start_date"
                                                value={schedule.start_date}
                                                onChange={event => handleMainInputChange(event)}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p className="text-indigo-400 font-inter mb-[4px]">End Date</p>
                                            <input
                                                type="date"
                                                name="end_date"
                                                value={schedule.end_date}
                                                onChange={event => handleMainInputChange(event)}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-indigo-400 font-inter mb-[4px]">Day to Day Schedule</p>
                                    <div style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px", borderStyle: "dashed" }} className="flex justify-center items-center">
                                        <div className="w-full" >
                                            <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                                <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                                    <button
                                                        onClick={(e) => addDay(e)}
                                                        type="button"
                                                        className={"text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                    >
                                                        <PlusIcon className="h-10 w-10" /> Add Day
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {days.map((day, index) => (
                                        <>
                                            <div className="flex flex-row gap-10">
                                                <div className="w-full flex justify-between">
                                                    <p className="text-black font-bold mb-[4px]">Day {index + 1}</p>
                                                    <button
                                                        onClick={(e) => removeDay(e, index)}
                                                        className={"text-base lg:text-lg font-bold rounded-full"}
                                                    >
                                                        <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                    </button>
                                                </div>

                                                <div className="w-full">
                                                    <p className="text-indigo-400 font-inter mb-[4px]">Date</p>
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        value={day.date}
                                                        onChange={event => handleDayInputChange(event, index)}
                                                        className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px", borderStyle: "dashed" }} className="flex justify-center items-center">
                                                <div className="w-full" >
                                                    <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                                        <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                                            <button
                                                                onClick={e => addEvent(e, index)}
                                                                type="button"
                                                                className={"text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                            >
                                                                <PlusIcon className="h-10 w-10" /> Add Event
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {day.events.map((currentEvent, ind) => (
                                                <>
                                                    <div className="w-full flex justify-between">
                                                        <p className="text-black font-bold mb-[4px]">Event {ind + 1}</p>
                                                        <button
                                                            onClick={(e) => removeEvent(e, index, ind)}
                                                            className={"text-base lg:text-lg font-bold rounded-full"}
                                                        >
                                                            <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                        </button>
                                                    </div>
                                                    <div className="w-8/12" >
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Name</p>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={currentEvent.name}
                                                            onChange={event => handleEventInputChange(event, index, ind)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            placeholder="Event Name"
                                                        />
                                                    </div>
                                                    <div className="w-8/12" >
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Location</p>
                                                        <input
                                                            type="text"
                                                            name="location"
                                                            value={currentEvent.location}
                                                            onChange={event => handleEventInputChange(event, index, ind)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            placeholder="Location"
                                                        />
                                                    </div>
                                                    <div className="w-8/12" >
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Description</p>
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            value={currentEvent.description}
                                                            onChange={event => handleEventInputChange(event, index, ind)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            placeholder="Location"
                                                        />
                                                    </div>
                                                    <div className="flex flex-row gap-10">
                                                        <div className="w-full">
                                                            <p className="text-indigo-400 font-inter mb-[4px]">Starts At</p>
                                                            <input
                                                                type="time"
                                                                name="from"
                                                                value={currentEvent.from}
                                                                onChange={event => handleEventInputChange(event, index, ind)}
                                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            />
                                                        </div>
                                                        <div className="w-full">
                                                            <p className="text-indigo-400 font-inter mb-[4px]">Ends At</p>
                                                            <input
                                                                type="time"
                                                                name="to"
                                                                value={currentEvent.to}
                                                                onChange={event => handleEventInputChange(event, index, ind)}
                                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </>
                                    ))}
                                    <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                        <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                            <button
                                                onClick={handleSubmit}
                                                className={"w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                            >
                                                Submit Schedule
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ScheduleQuestPage;


