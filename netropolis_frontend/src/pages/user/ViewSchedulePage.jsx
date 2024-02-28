import React, { useState, useEffect } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import Header from "../../components/globals/Header";
import Footer from "../../components/globals/Footer";
import navigations from "../../data/navigations.json";
import mesh from "../../assets/images/mesh.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppLoader from "../../utils/AppLoader";

const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
};

const timeZone = "Asia/Tokyo"

const convertToEvent = (eventIfo, date) => {
    const toBeReturned = {
        summary: eventIfo.name,
        location: eventIfo.location,
        description: eventIfo.description,
        start: {
            dateTime: `${date}T${eventIfo.from}:00`,
            timeZone: timeZone,
        },
        end: {
            dateTime: `${date}T${eventIfo.to}:00`,
            timeZone: timeZone,
        },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'popup', minutes: 10 },
            ],
        }
    }
    return toBeReturned;
}

const ViewSchedulePage = () => {
    const { userInfo, tokens } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { applicationId } = useParams();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;
    const [remarks, setRemarks] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [open, setOpen] = useState({}); // Initialize open state as an empty object

    useEffect(() => {
        if (userInfo === null || userInfo.role !== "user") {
            toast.error("Please login to continue.");
            navigate("/login");
        } else {
            fetchScheduleData();
        }
    }, [navigate, userInfo]);

    useEffect(() => {
        const initialOpenState = {}; // Object to hold the state of all accordions
        schedule.day_to_day_schedule?.forEach((_, index) => {
            initialOpenState[index + 1] = false; // Initialize all accordions as closed
        });
        setOpen(initialOpenState);
    }, [schedule]);

    const addToCalendar = async () => {
        const Schedule = schedule.day_to_day_schedule;
        setLoading2(true);
        let err = false;
        for (let i = 0; i < Schedule.length; i++) {
            const currDate = Schedule[i].date;
            console.log(Schedule[i]);
            for (let j = 0; j < Schedule[i].events.length; j++) {
                const eventInfo = Schedule[i].events[j];
                const event = convertToEvent(eventInfo, currDate);
                console.log(event);
                try {
                    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Bearer ${tokens.access_google}`
                        },
                        body: JSON.stringify(event)
                    }
                    )
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    const data = await response.json();
                    console.log(data);

                    setDisabled(true);
                }
                catch (error) {
                    toast.error(error.message);
                    err = true;
                    break;
                }
                if (err) break;
            }
            if (!err) {
                toast.success("Added to your calendar successfully.");
            }


        }
        setLoading2(false);
    };

    const [disabled, setDisabled] = useState(false);

    const fetchScheduleData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/get_schedule_by_application_id/?pk=${applicationId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens.access}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data);
                throw new Error('Something went wrong');
            }
            setSchedule(data);
        }
        catch (error) {
            toast.error(error.message);
            navigate("/viewapplications");
        }
        finally {
            setLoading(false);
        }
    };
    const sendForReview = async (e) => {
        e.preventDefault();
        if (remarks === "") {
            toast.error("Please enter remarks/requests.");
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/send_application_for_review/?pk=${applicationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens.access}`,
                },
                body: JSON.stringify({ remarks: remarks, status: "review" }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data);
                throw new Error('Failed to send Reschedule request');
            }
            toast.success("Reschedule request sent successfully.");
            navigate("/viewapplications");
        }
        catch (error) {
            toast.error(error.message);
        }
    };
    function Icon({ id }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${open[id] ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }

    const handleOpen = (id) => {
        setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
    };

    return (
        <>
            <Header navigations={navigations} />
            <div className="flex bg-transparent min-h-[100vh] w-full">
                <div className="sm:flex justify-center  bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                    {loading2 && <AppLoader customClass={"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"} />}
                    {loading && <div className="w-full min-h-[80vh] flex justify-center items-center"><AppLoader /></div>}
                    {!loading && (
                        <div className="flex flex-col mt-20 w-full justify-center items-center">
                            <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                                <p className="font-fira text-medium text-4xl text-indigo-400">Quest Schedule</p>
                                <p className="mb-2">Please check all the details carefully</p>
                            </div>
                            <div className="flex gap-4 justify-center items-center">
                                <div className="flex flex-col gap-4">
                                    <strong className="text-lg text-center text-indigo-400">Start Date</strong>
                                    <p className="text-center">{new Date(schedule.start_date).toDateString()}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <strong className="text-lg text-center text-indigo-400">End Date</strong>
                                    <p className="text-center">{new Date(schedule.end_date).toDateString()}</p>
                                </div>

                            </div>
                            {tokens.access_google && <button className={`w-56 text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-md mt-4 ${disabled ? "disabled:bg-indigo-200" : ""}`} disabled={disabled} onClick={(e) => { e.preventDefault(); addToCalendar(); }}>
                                ADD TO CALENDAR
                            </button>}
                            {Object.keys(open).length > 0 && (
                                <div className="w-1/2 max-md:w-11/12 self-center">
                                    {schedule.day_to_day_schedule.map((item, index) => (
                                        <Accordion key={index + 1} open={open[index + 1]} animate={CUSTOM_ANIMATION} icon={<Icon id={index + 1} />}>
                                            <AccordionHeader onClick={() => handleOpen(index + 1)} className=" border-b-2 border-gray-400">
                                                <div className="flex justify-between items-center w-full">
                                                    <div>Day {index + 1}</div>
                                                    <div className="font-light text-sm">{new Date(item.date).toDateString()}</div>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody>
                                                {item.events.map((event, eventIndex) => (
                                                    <div key={eventIndex} className="border border-gray-300 p-4 mb-2 rounded-md bg-slate-50 shadow-lg">
                                                        <p className="text-lg font-semibold text-indigo-400">{event.name}</p>
                                                        <p className="text-gray-500"><strong>Time:</strong> {event.from} - {event.to}</p>
                                                        <p className="text-gray-500"><strong>Location:</strong> {event.location}</p>
                                                        <p className="text-gray-500"><strong>Description:</strong> {event.description}</p>
                                                    </div>
                                                ))}
                                            </AccordionBody>
                                        </Accordion>
                                    ))}
                                </div>
                            )}
                            <form className="flex flex-col justify-center items-center w-full m-8 self-center" onSubmit={sendForReview}>
                                <div style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }} className="min-w-[40vw] max-md:min-w-[90vw] bg-slate-50">
                                    <div className="w-full flex justify-between pb-2">
                                        <p className="text-indigo-400 font-bold font-inter mb-[4px]">ADD REMARKS/REQUESTS</p>

                                    </div>

                                    <div className="w-full" >
                                        <input
                                            type="text"
                                            name="description"
                                            value={remarks}
                                            onChange={event => setRemarks(event.target.value)}
                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                            placeholder="Enter Remarks/Requests Here"
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className={"w-[150px] text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full mt-4 "}
                                        >
                                            Submit
                                        </button></div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ViewSchedulePage;
