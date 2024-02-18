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

import { PlusIcon, MinusCircleIcon, ClipboardDocumentCheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import mesh from "../assets/images/mesh.png";
import Footer from "../components/globals/Footer";
import Header from "../components/globals/Header";
import navigations from "../data/navigations.json";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;



const RegisterQuest = () => {
    const [questData, setQuestData] = useState({
        quest_name: "",
        region: "",
        description: "",
        genre_tags: [],
        rewards: "",
        other_information: "",
        available_till: "",
    });
    const [naturalActivities, setNaturalActivities] = useState([
        {
            activity: "",
        }
    ])
    const [currTag, setCurrTag] = useState("");
    const [labourShortageActivities, setLabourShortageActivities] = useState([
        {
            activity: "",
        }
    ])
    const [localActivities, setLocalActivities] = useState([
        {
            activity: "",
        }
    ])

    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        try {
            const res = fetch(`${baseUrl}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokens.access
                },
            });
            if (!res.ok) {
                setTasks(dummyTasks);
                throw new Error('Something went wrong. Please try again later.')
            }
            else {
                const data = res.json();
                console.log(data);
                setTasks(data);
            }
        }
        catch (err) {
            toast.error("Failed to fetch tasks. Please check your connection and try again later.");
        }
    }

    const userInfo = useSelector((state) => state.auth);
    const navigate = useNavigate();
    let dummyTasks = [
        {
            task: "Choose your first Pokemon"
        },
        {
            task: "Catch 5 Pokemons"
        },
        {
            task: "Win 5 battles"
        },
        {
            task: "Defeat Team Rocket"
        },
        {
            task: "Defeat Gym Leader"
        },
        {
            task: "Defeat Elite Four"
        },
        {
            task: "Defeat Champion"
        },
        {
            task: "Catch Legendary Pokemon"
        },
        {
            task: "Catch Mythical Pokemon"
        },
        {
            task: "Complete Pokedex and start new game plus. Padhai Likhai karo IAS VAIS bano aur desh ko sambhalo"
        },
        {
            task: "Choose your first Pokemon"
        },
        {
            task: "Catch 5 Pokemons"
        },
        {
            task: "Win 5 battles"
        },
        {
            task: "Defeat Team Rocket"
        },
        {
            task: "Defeat Gym Leader"
        },
        {
            task: "Defeat Elite Four"
        },
        {
            task: "Defeat Champion"
        },
        {
            task: "Catch Legendary Pokemon"
        },
        {
            task: "Catch Mythical Pokemon"
        },
        {
            task: "Complete Pokedex and start new game plus. Padhai Likhai karo IAS VAIS bano aur desh ko sambhalo"
        }
    ]
    useEffect(() => {
        if (userInfo === null) {
            console.log("redirecting to login");
            navigate('/login')
        }
        fetchTasks();
    }, []);

    const tokens = useSelector((state) => state.auth.tokens);
    // console.log("tokens", tokens);

    // Handle Input Change
    const handleDynamicActivityInputChange = (e, index, activities, setActivities) => {
        const values = [...activities];
        values[index][e.target.name] = e.target.value;
        setActivities(values);
    }
    const genreTagsInputChange = (e, tag) => {

        e.preventDefault();
        if (tag === "") {
            toast.error("Please enter a tag");
            return;
        }
        setQuestData({ ...questData, genre_tags: [...questData.genre_tags, tag] })
        setCurrTag("");

    }
    const genreTagDelete = (e, index) => {
        e.preventDefault();
        const values = [...questData.genre_tags];
        values.splice(index, 1);
        setQuestData({ ...questData, genre_tags: values });
    }


    const handlePrimaryInputChange = (e) => {
        setQuestData(
            { ...questData, [e.target.name]: e.target.value }
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (questData.quest_name === "" || questData.region === "" || questData.rewards === "" || questData.other_information === "" || questData.genre_tags.length === 0 || questData.available_till === "" || questData.description === "") {
            toast.error("Please fill in all the fields.");
            return;
        }
        naturalActivities.forEach((naturalActivity) => {
            if (naturalActivity.activity === "") {
                toast.error("Please fill in all the fields.");
                return;
            }
        })
        localActivities.forEach((naturalActivity) => {
            if (naturalActivity.activity === "") {
                toast.error("Please fill in all the fields.");
                return;
            }
        })
        labourShortageActivities.forEach((naturalActivity) => {
            if (naturalActivity.activity === "") {
                toast.error("Please fill in all the fields.");
                return;
            }
        })
        const toBeSent = {
            ...questData,
            natural_activities: naturalActivities,
            local_activities: localActivities,
            labour_shortage_activities: labourShortageActivities
        }
        try {
            const res = await fetch("http://localhost:8000/quest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + tokens.access
                },
                body: JSON.stringify(toBeSent)
            }
            )
            if (!res.ok) {
                throw Error("Error in creating quest. Please Try Again");
            }
            const data = await res.json();
            console.log(data);
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        }

    };

    const addFields = (e, activities, setActivities) => {
        e.preventDefault();
        setActivities([...activities, { activity: "" }]);
    }
    const removeFields = (e, index, activities, setActivities) => {
        e.preventDefault();
        const values = [...activities];
        values.splice(index, 1);
        setActivities(values);
    }

    return (
        <><Header navigations={navigations} /><div className="sm:flex justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
            <div className=" flex flex-auto max-md:flex-col flex-shrink-0 antialiased bg-transparent">
                <div className=" md:sticky max-md:mt-20 flex flex-col top-20 left-0 max-md:w-[100%] md:w-[20%] xl:w-[30%] min-h-[100vh] max-h-[100vh] bg-white h-full border">
                    <div className=" overflow-auto flex-grow">
                        <ul className="flex flex-col py-4 space-y-1">
                            <li className="px-5">
                                <div className="flex flex-row items-center h-8">
                                    <p

                                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 font-bold"
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <ClipboardDocumentCheckIcon className="h-5 w-5" />
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide text-wrap">
                                            Available Tasks/Events
                                        </span>
                                    </p>
                                </div>
                            </li>
                            {tasks.map((task, index) => {
                                return (
                                    <li key={index}>
                                        <p

                                            className="relative flex flex-row items-center min-h-11 h-auto focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                        >

                                            <span className="ml-2 text-sm tracking-wide text-wrap">
                                                {task.task}
                                            </span>
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="flex bg-transparent h-auto w-full justify-center items-center">
                    {/* left side */}

                    <div className="flex flex-col h-auto min-h-[100vh] max-md:max-w-full max-w-[50%] flex-1 mb-5 mt-32">
                        {/* <div className="flex justify-end p-1"></div> */}

                        <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                            <p className="font-fira text-medium text-4xl text-indigo-400">
                                Create Quest
                            </p>
                            <p className="mb-2">
                                Create a quest and let the world know about it.
                            </p>
                        </div>

                        {<AppError />}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="flex flex-col xl:flex-row pr-2 pl-2 justify-center items-center w-full">
                                <div className="w-full">
                                    <div className=" w-full flex flex-col items-center justify-center xl:self-start gap-4">
                                        <div className="w-8/12 " >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Quest Name</p>
                                            <input
                                                type="text"
                                                name="quest_name"
                                                value={questData.quest_name}
                                                onChange={handlePrimaryInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Quest Name"
                                            />
                                        </div>
                                        <div className="w-8/12 " >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Description</p>
                                            <input
                                                type="text"
                                                name="description"
                                                value={questData.description}
                                                onChange={handlePrimaryInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Description"
                                            />
                                        </div>
                                        <div className="w-8/12 " >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Region</p>
                                            <input
                                                type="text"
                                                name="region"
                                                value={questData.region}
                                                onChange={handlePrimaryInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Region"
                                            />
                                        </div>
                                        <div className="w-8/12" >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Rewards</p>
                                            <input
                                                type="text"
                                                name="rewards"
                                                value={questData.rewards}
                                                onChange={handlePrimaryInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Rewards"
                                            />
                                        </div>
                                        <div className="w-8/12" >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Other Information</p>
                                            <input
                                                type="text"
                                                name="other_information"
                                                value={questData.other_information}
                                                onChange={handlePrimaryInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Other Information"
                                            />
                                        </div>
                                        <div className="w-8/12" >
                                            <div className="flex justify-center items-center gap-4 mb-2">
                                                <p className="text-indigo-400 font-inter mb-[4px]">Genre Tags</p>
                                                <button
                                                    onClick={(e) => genreTagsInputChange(e, currTag)}
                                                    className={"text-white lg:text-lg font-bold rounded-full bg-indigo-400 px-2"}
                                                >
                                                    ADD
                                                </button></div>
                                            {questData.genre_tags.length > 0 && questData.genre_tags.map((tag, index) => {
                                                return (
                                                    <span key={index} className="inline-flex justify-center items-center ml-4 rounded-full bg-indigo-400 p-1 px-2 tracking-wide m-1">
                                                        <p className="text-white font-inter">{tag}</p> <button
                                                            onClick={(e) => genreTagDelete(e, index)}
                                                            className={"text-base lg:text-lg font-bold rounded-full"}
                                                        >
                                                            <XMarkIcon className="h-5 w-5 text-white " />
                                                        </button></span>


                                                )
                                            })
                                            }
                                            <input type="text" name="genre_tags" value={currTag} onChange={(e) => { setCurrTag(e.target.value) }} className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px] mt-2" placeholder="Genre Tags" />

                                        </div>
                                        <div className="w-8/12" >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Available Till</p>
                                            <input
                                                type="date"
                                                name="available_till"
                                                value={questData.available_till}
                                                onChange={handlePrimaryInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Available Till"
                                            />
                                        </div>

                                    </div>
                                    <div className=" w-full grid grid-cols-1 gap-5 mt-4" >
                                        <div className="flex justify-center items-center gap-4">
                                            <p className="text-black font-bold text-center">Natural Activities</p><button
                                                onClick={(e) => addFields(e, naturalActivities, setNaturalActivities)}
                                                className={"text-white lg:text-lg font-bold rounded-full bg-indigo-400 px-2"}
                                            >
                                                ADD
                                            </button></div>
                                        {naturalActivities.length > 0 && <div className="flex flex-col gap-2" style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }}>
                                            {naturalActivities.map((naturalActivity, index) => {
                                                return (

                                                    <div key={index} className="w-full">
                                                        <div className="w-full flex justify-between" >

                                                            <span className="inline-flex justify-center items-center ml-4">
                                                                <p className="text-indigo-400 font-inter mb-[4px]">Natural Activity {index + 1}</p></span>
                                                            <span className="w-[60%] ml-2 text-sm tracking-wide text-wrap ">
                                                                <input
                                                                    type="text"
                                                                    name="activity"
                                                                    value={naturalActivity.activity}
                                                                    onChange={event => handleDynamicActivityInputChange(event, index, naturalActivities, setNaturalActivities)}
                                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                    placeholder="Enter Natural Activity"
                                                                /></span><button
                                                                    onClick={(e) => removeFields(e, index, naturalActivities, setNaturalActivities)}
                                                                    className={"text-base lg:text-lg font-bold rounded-full"}
                                                                >
                                                                <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>}</div>



                                    <div className=" w-full grid grid-cols-1 gap-5 mt-4" >
                                        <div className="flex justify-center items-center gap-4">
                                            <p className="text-black font-bold text-center">Labour Shortage Activities</p><button
                                                onClick={(e) => addFields(e, labourShortageActivities, setLabourShortageActivities)}
                                                className={"text-white lg:text-lg font-bold rounded-full bg-indigo-400 px-2"}
                                            >
                                                ADD
                                            </button></div>
                                        {labourShortageActivities.length > 0 && <div className="flex flex-col gap-2" style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }}>
                                            {labourShortageActivities.map((labourShortageActivity, index) => {
                                                return (

                                                    <div key={index} className="w-full">




                                                        <div className="w-full flex justify-between" >

                                                            <span className="inline-flex justify-center items-center ml-4">
                                                                <p className="text-indigo-400 font-inter mb-[4px]">Labour Activity {index + 1}</p></span>
                                                            <span className="w-[60%] ml-2 text-sm tracking-wide text-wrap ">
                                                                <input
                                                                    type="text"
                                                                    name="activity"
                                                                    value={labourShortageActivity.activity}
                                                                    onChange={event => handleDynamicActivityInputChange(event, index, labourShortageActivities, setLabourShortageActivities)}
                                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                    placeholder="Enter Labour Shortage Activity"
                                                                /></span><button
                                                                    onClick={(e) => removeFields(e, index, labourShortageActivities, setLabourShortageActivities)}
                                                                    className={"text-base lg:text-lg font-bold rounded-full"}
                                                                >
                                                                <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>}</div>

                                    <div className=" w-full grid grid-cols-1 gap-5 mt-4 mb-4" >
                                        <div className="flex justify-center items-center gap-4">
                                            <p className="text-black font-bold text-center">Local Activities</p><button
                                                onClick={(e) => addFields(e, localActivities, setLocalActivities)}
                                                className={"text-white lg:text-lg font-bold rounded-full bg-indigo-400 px-2"}
                                            >
                                                ADD
                                            </button></div>
                                        {localActivities.length > 0 && <div className="flex flex-col gap-2" style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }}>
                                            {localActivities.map((localActivity, index) => {
                                                return (

                                                    <div key={index} className="w-full">




                                                        <div className="w-full flex justify-between" >

                                                            <span className="inline-flex justify-center items-center ml-4">

                                                                <p className="text-indigo-400 font-inter mb-[4px]">Local Activity {index + 1}</p></span>
                                                            <span className="w-[60%] ml-2 text-sm tracking-wide text-wrap ">
                                                                <input

                                                                    type="text"
                                                                    name="activity"
                                                                    value={localActivity.activity}
                                                                    onChange={event => handleDynamicActivityInputChange(event, index, localActivities, setLocalActivities)}
                                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                    placeholder="Enter Local Activity"
                                                                /></span><button
                                                                    onClick={(e) => removeFields(e, index, localActivities, setLocalActivities)}
                                                                    className={"text-base lg:text-lg font-bold rounded-full"}
                                                                >
                                                                <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                            </button>

                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>}</div>


                                </div>

                            </div>
                            <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                    <button
                                        onClick={handleSubmit}
                                        className={"w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                    >
                                        Create Quest
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

            <Footer navigations={navigations} />
        </>
    );
};

export default RegisterQuest;