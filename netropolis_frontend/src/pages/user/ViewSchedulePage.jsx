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

const ViewSchedulePage = () => {
    const { userInfo, tokens } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { applicationId } = useParams();
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

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
        schedule.forEach((_, index) => {
            initialOpenState[index + 1] = true; // Initialize all accordions as open
        });
        setOpen(initialOpenState);
    }, [schedule]);

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
            setSchedule(data.day_to_day_schedule);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
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
                    {loading && <div className="w-full min-h-[80vh] flex justify-center items-center"><AppLoader /></div>}
                    {!loading && (
                        <div className="flex flex-col mt-20 w-full">
                            <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                                <p className="font-fira text-medium text-4xl text-indigo-400">Quest Schedule</p>
                                <p className="mb-2">Please check all the details carefully</p>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <div className="flex flex-col gap-4">
                                    <strong className="text-lg text-center text-indigo-400">Start Date</strong>
                                    <p className="text-center">10th August 2021</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <strong className="text-lg text-center text-indigo-400">End Date</strong>
                                    <p className="text-center">10th August 2021</p>
                                </div>
                            </div>
                            {Object.keys(open).length > 0 && (
                                <div className="w-1/2 max-md:w-11/12 self-center">
                                    {schedule.map((item, index) => (
                                        <Accordion key={index + 1} open={open[index + 1]} animate={CUSTOM_ANIMATION} icon={() => <Icon id={index + 1} open={open[index + 1]} />}>
                                            <AccordionHeader onClick={() => handleOpen(index + 1)} >
                                                <div className="flex justify-between items-center w-full">
                                                    <div>Day {index + 1}</div>
                                                    <div className="font-light text-sm">{new Date(item.date).toDateString()}</div>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody>
                                                {item.events.map((event, eventIndex) => (
                                                    <div key={eventIndex} className="border border-gray-300 p-4 rounded-md mb-2">
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
                        </div>
                    )}
                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ViewSchedulePage;
