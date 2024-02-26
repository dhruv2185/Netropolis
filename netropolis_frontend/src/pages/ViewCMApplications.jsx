import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignUpMutation } from "../features/slices/usersApiSlice";
import { setCredentials, setTokens } from "../features/slices/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppLoader from "../utils/AppLoader";
import { AppError } from "../utils/AppError";

import { PlusIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import mesh from "../assets/images/mesh.png";
import Footer from "../components/globals/Footer";
import Header from "../components/globals/Header";
import navigations from "../data/navigations.json";
import CMApplicationList from "../components/globals/CMApplicationList";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;

const ViewCMApplications = () => {

    const dummyApplications = [
        {
            quest_name: "Pokemon Quest",
            region: "Kanto",
            genre_tags: ["Pikachu", "Bulbasaur", "Charizard", "Squirtle", "Mewtwo"],
            rewards: 8000,
            other_information: "I wanna be the very best, like no one ever was. To catch them is my real test, to train them is my cause.",
            available_till: "Thu Feb 22 2024",
            stay_start_date: "dd-mm-yyyy",
            stay_end_date: "dd-mm-yyyy",
            special_note: "Any specific information you want to share with us?",
            desired_tasks: ["Task 1", "Task 2", "Task 3"],
            daily_time_span: "10:00 AM - 12:00 PM, 3:00 PM - 5:00 PM",
            team_name: "Select Team",
            description: "ERFVS wsdfc SWEDF e fcwesF WEF ewfWE FEDF  ewdfedw sdfFE WEDF EWD fewd fewDFCEWD fcWEF EW EDf WEDF wf",
            status: "UNDER REVIEW"
        }, {
            quest_name: "Pokemon Quest",
            region: "Kanto",
            genre_tags: ["Pikachu", "Bulbasaur", "Charizard", "Squirtle", "Mewtwo"],
            rewards: 8000,
            other_information: "I wanna be the very best, like no one ever was. To catch them is my real test, to train them is my cause.",
            available_till: "Thu Feb 22 2024",
            stay_start_date: "dd-mm-yyyy",
            stay_end_date: "dd-mm-yyyy",
            special_note: "Any specific information you want to share with us?",
            desired_tasks: ["Task 1", "Task 2", "Task 3"],
            daily_time_span: "10:00 AM - 12:00 PM, 3:00 PM - 5:00 PM",
            team_name: "Select Team",
            description: "ERFVS wsdfc SWEDF e fcwesF WEF ewfWE FEDF  ewdfedw sdfFE WEDF EWD fewd fewDFCEWD fcWEF EW EDf WEDF wf",
            status: "UNDER REVIEW"
        }, {
            quest_name: "Pokemon Quest",
            region: "Kanto",
            genre_tags: ["Pikachu", "Bulbasaur", "Charizard", "Squirtle", "Mewtwo"],
            rewards: 8000,
            other_information: "I wanna be the very best, like no one ever was. To catch them is my real test, to train them is my cause.",
            available_till: "Thu Feb 22 2024",
            stay_start_date: "dd-mm-yyyy",
            stay_end_date: "dd-mm-yyyy",
            special_note: "Any specific information you want to share with us?",
            desired_tasks: ["Task 1", "Task 2", "Task 3"],
            daily_time_span: "10:00 AM - 12:00 PM, 3:00 PM - 5:00 PM",
            team_name: "Select Team",
            description: "ERFVS wsdfc SWEDF e fcwesF WEF ewfWE FEDF  ewdfedw sdfFE WEDF EWD fewd fewDFCEWD fcWEF EW EDf WEDF wf",
            status: "UNDER REVIEW"
        }, {
            quest_name: "Pokemon Quest",
            region: "Kanto",
            genre_tags: ["Pikachu", "Bulbasaur", "Charizard", "Squirtle", "Mewtwo"],
            rewards: 8000,
            other_information: "I wanna be the very best, like no one ever was. To catch them is my real test, to train them is my cause.",
            available_till: "Thu Feb 22 2024",
            stay_start_date: "dd-mm-yyyy",
            stay_end_date: "dd-mm-yyyy",
            special_note: "Any specific information you want to share with us?",
            desired_tasks: ["Task 1", "Task 2", "Task 3"],
            daily_time_span: "10:00 AM - 12:00 PM, 3:00 PM - 5:00 PM",
            team_name: "Select Team",
            description: "ERFVS wsdfc SWEDF e fcwesF WEF ewfWE FEDF  ewdfedw sdfFE WEDF EWD fewd fewDFCEWD fcWEF EW EDf WEDF wf",
            status: "UNDER REVIEW"
        },
        // More applications...
    ]

    const tokens = useSelector((state) => state.auth.tokens);

    const fetchApplications = async () => {
        try {
            const res = await fetch(`${baseUrl}/get_applications_by_cm/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + tokens.access
                },
            })
            const data = await res.json();
            if (!res.ok) {
                console.log(data);
                throw Error("Failed to fetch applications. Please try again!");
            }
            else {
                if (Array.isArray(data)) {
                    setApplications(data);
                }
                else {
                    setApplications([data]);
                }
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }

    const [applications, setApplications] = useState()

    const userInfo = useSelector((state) => state.auth.userInfo);

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo === null) {
            console.log("redirecting to login");
            toast.error("Please login to continue.")
            navigate('/')
        }
        else
            fetchApplications();
    }, []);


    // console.log("tokens", tokens);

    return (
        <><Header navigations={navigations} />
            <div className="flex bg-transparent h-auto w-full" >
                {/* left side */}
                <div className="sm:flex justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                    <div className="flex flex-col h-auto min-h-[100vh] w-full flex-1 mb-5 mt-32">
                        {/* <div className="flex justify-end p-1"></div> */}

                        <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                            <p className="font-fira text-medium text-4xl text-indigo-400">
                                My Applications
                            </p>
                            <p className="mb-2">You can view all your Applications here   </p>
                        </div>

                        {<AppError />}
                        {applications && applications.length > 0 && < CMApplicationList applications={applications} />}
                        {applications && applications.length === 0 && <p className="text-center text-lg text-neutral-400">No applications found</p>}
                    </div>
                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ViewCMApplications;