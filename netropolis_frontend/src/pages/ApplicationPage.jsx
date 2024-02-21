import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCredentials, setTokens } from "../features/slices/authSlice";
import AppLoader from "../utils/AppLoader";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../features/slices/usersApiSlice";
import Button from "../components/globals/Button";
import Title from "../components/globals/Title";
import navigations from "../data/navigations.json";
import Header from "../components/globals/Header";
import mesh from "../assets/images/mesh.png";
import Footer from "../components/globals/Footer";

const ApplicationPage = (props) => {
    // route : /quests/questId
    const navigate = useNavigate();
    
    let dummyTeams = [
        {
            id: 1,
            team_name: "Team 1"
        },
        {
            id: 2,
            team_name: "Team 2"
        },
        {
            id: 3,
            team_name: "Team 3"
        },
        {
            id: 4,
            team_name: "Team 4"
        }
    ]
    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

    const { questId } = useParams();
    const { questData } = props;
    
    const [teams, setTeams] = useState(dummyTeams);

    const { userInfo, tokens } = useSelector((state) => state.auth);

    const [appInfo, setAppInfo] = useState({
        userId: userInfo.id,
        questId: questId,
        stay_start_date: "",
        stay_end_date: "",
        special_note: "",
        desired_tasks: "",
        teamId: "",
        daily_time_span: ""
    });
    //  quest data props se ayega
    const quest_data = {
        quest_name: "Pokemon Quest",
        region: "Kanto",
        genre_tags: ["Pikachu", "Bulbasaur", "Charizard", "Squirtle", "Mewtwo"],
        rewards: "$8000",
        other_information: "I wanna be the very best, like no one ever was. To catch them is my real test, to train them is my cause.",
        available_till: Date.now(),
    }
    useEffect(() => {
        if (!userInfo) {
            toast.error("Please login to continue.")
            navigate("/");
        }
        else
            fetchTeams();
    }, [navigate, userInfo]);
    const fetchTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTeams(data);
            } else {
                throw new Error(data.message);
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }


   

    const handleInputChange = (e) => {
        setAppInfo({ ...appInfo, [e.target.name]: e.target.value });
    }

    // target quest id from params
    // user id from userInfo or can get in the backend
    // duration of stay  -> from date - to date
    // special note
    // daily time span
    // desired tasks -> tasks with more interest
    // team id

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date();
        if (appInfo.stay_start_date > appInfo.stay_end_date || new Date(appInfo.stay_start_date) < today || new Date(appInfo.stay_end_date) < today) {
            return toast.error("Oops! I guess you mixed up your dates. Please check again.");
        }
        if (appInfo.stay_start_date === "" || appInfo.stay_end_date === "" || appInfo.special_note === "" || appInfo.desired_tasks === "" || appInfo.teamId === "" || appInfo.daily_time_span === "") {
            return toast.error("All fields are required");
        }
        console.log(appInfo);
        appInfo.userId = userInfo.id;
        try {
            const response = await fetch(`${BASE_URL}/applications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens.access}`
                },
                body: JSON.stringify(appInfo)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toast.success("Application submitted successfully");
                navigate("/");
            } else {
                throw new Error(data.message);
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <>
            <Header navigations={navigations} ></Header>
            <div className="flex bg-transparent h-auto w-full" >
                <div className="justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center" style={{ backgroundImage: `url(${mesh})` }}>
                    <div className="md:flex flex-1 w-full max-md:mt-20 mt-14 min-h-[120vh]">
                        <div className="sm:w-full lg:max-w-[60%]  flex flex-col justify-center items-center">
                            <div className="text-center mb-10">
                                <Title title="Quest Summary" subtitle={"Please check all details carefully"} titleClass={"text-indigo-400"} />
                            </div><div className="flex flex-col gap-2 md:max-w-lg md:pl-[5%] w-full max-md:items-center max-md:justify-center max-md:p-10">
                                <h2 className="font-medium text-indigo-400 font-inter "> Quest Name</h2>
                                <p className="text-black font-inter mb-4">{quest_data.quest_name}</p>
                                <h2 className="font-medium text-indigo-400 font-inter "> Region</h2>
                                <p className="text-black font-inter mb-4">{quest_data.region}</p>
                                <h2 className="font-medium text-indigo-400 font-inter "> Genre Tags</h2>
                                <div className="flex flex-wrap gap-2 mb-4 max-md:justify-center max-md:items-center">
                                    {
                                        quest_data.genre_tags.map((tag, index) => (
                                            <p key={index} className="text-white font-inter bg-indigo-400 px-2 py-1 rounded-full ">{tag}</p>
                                        ))
                                    }
                                </div>
                                <h2 className="font-medium text-indigo-400 font-inter "> Rewards</h2>
                                <p className="text-black font-inter mb-4">{quest_data.rewards}</p>
                                <h2 className="font-medium text-indigo-400 font-inter"> Other Information</h2>
                                <p className="text-black font-inter mb-4">{quest_data.other_information}</p>
                                <h2 className="font-medium text-indigo-400 font-inter "> Available Till</h2>
                                <p className="text-black font-inter mb-4">{new Date(quest_data.available_till).toDateString()}</p>

                            </div>


                        </div>
                        <div className="flex bg-transparent sm:w-full lg:max-w-[40%]">

                            <div className="w-full flex justify-center items-center bg-transparent">
                                <div className="max-w-lg p-5 bg-transparent">
                                    <div className="text-center mb-10 mt-22">
                                        <Title title="Quest Application" subtitle={"Get one step closer to embark on your QUEST"} titleClass={"text-indigo-400"} />
                                    </div>
                                    {/* Yaha quest Id , quest Name, userInfo display honi chahiye uske baad form start hoga -> IMPORTANT */}
                                    <form onSubmit={handleSubmit} className=" flex flex-col gap-2 lg:max-w-md">
                                        <h2 className="font-medium text-indigo-400 font-inter mb-[4px]"> Duration of Stay</h2>
                                        <div className="grid grid-cols-2 gap-10">
                                            <div>
                                                <p className=" text-indigo-400 font-inter mb-[4px]">From</p>
                                                <input
                                                    type="date"
                                                    name="stay_start_date"
                                                    value={appInfo.stay_start_date}
                                                    onChange={handleInputChange}
                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <p className=" text-indigo-400 font-inter mb-[4px]">To</p>
                                                <input
                                                    type="date"
                                                    name="stay_end_date"
                                                    value={appInfo.stay_end_date}
                                                    onChange={handleInputChange}
                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full" >
                                            <p className="font-medium text-indigo-400 font-inter mb-[4px]">Special Note</p>
                                            <input
                                                type="text"
                                                name="special_note"
                                                value={appInfo.special_note}
                                                onChange={handleInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px] "
                                                placeholder="Special Note"
                                            />
                                            <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700 text-wrap">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                                                    <path fillRule="evenodd"
                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                                Any specific information you want to share with us?
                                            </p>
                                        </div>
                                        <div className="w-full" >
                                            <p className="font-medium text-indigo-400 font-inter mb-[4px]">Desired Tasks</p>
                                            <textarea
                                                type="text"
                                                name="desired_tasks"
                                                value={appInfo.desired_tasks}
                                                onChange={handleInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-auto overflow-auto "
                                                placeholder="The tasks among the ones in the quest you are most interested about."
                                            />
                                        </div>
                                        <div className="w-full" >
                                            <p className="font-medium text-indigo-400 font-inter mb-[4px]">Preferred daily time span for quests during the stay </p>
                                            <input
                                                type="text"
                                                name="daily_time_span"
                                                value={appInfo.daily_time_span}
                                                onChange={handleInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Preferred time span"
                                            />
                                            <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                                                    <path fillRule="evenodd"
                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                                For Example : 10:00 AM - 12:00 PM, 3:00 PM - 5:00 PM etc.
                                            </p>
                                        </div>
                                        {/* select tag with dynamic options */}
                                        <div className="w-full" >
                                            <p className="font-medium text-indigo-400 font-inter mb-[4px]">Team</p>
                                            <select
                                                name="teamId"
                                                value={appInfo.teamId}
                                                onChange={handleInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                            >
                                                <option value="">Select Team</option>
                                                {
                                                    teams.map((team, index) => (
                                                        <option key={index} value={team.id}>{team.team_name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                            <button
                                                onClick={handleSubmit}
                                                className={`w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full`}
                                            >
                                                Submit Application
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div></div>

                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ApplicationPage;
