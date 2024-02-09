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

const RegisterQuest = () => {
    const [questData, setQuestData] = useState({
        quest_name: "",
        region: "",
        genre_tags: "",
        rewards: "",
        other_information: ""
    });
    const [naturalActivities, setNaturalActivities] = useState([
        {
            activity: "",
        }
    ])
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

    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userInfo === null) {
    //         console.log("redirecting to login");
    //         navigate('/login')
    //     }
    // }, []);

    const tokens = useSelector((state) => state.auth.tokens);
    // console.log("tokens", tokens);

    // Handle Input Change
    const handleDynamicActivityInputChange = (e, index, activities, setActivities) => {
        const values = [...activities];
        values[index][e.target.name] = e.target.value;
        setActivities(values);
    }

    const handlePrimaryInputChange = (e) => {
        setQuestData(
            { ...questData, [e.target.name]: e.target.value }
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (questData.quest_name === "" || questData.region === "" || questData.rewards === "" || questData.other_information === "" || questData.genre_tags === "") {
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
        console.log("remove karne ki koshish");
        if (activities.length === 1) {
            toast.error("You cannot remove the only member of the team.");
            return;
        }
        const values = [...activities];
        values.splice(index, 1);
        setActivities(values);
    }

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
                                <div>
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
                                            <p className="text-indigo-400 font-inter mb-[4px]">Genre Tags</p>
                                            <input
                                                type="text"
                                                name="genre_tags"
                                                value={questData.genre_tags}
                                                onChange={handlePrimaryInputChange}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Concerns"
                                            />
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
                                    </div>
                                    <div className="xl:[60%] lg:w-[70%] w-[90%] grid grid-cols-1 gap-5 auto-rows-fr " >

                                        {naturalActivities.map((naturalActivity, index) => {
                                            return (
                                                <div key={index} style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }}>
                                                    <div className="w-full flex justify-between">
                                                        <p className="text-black font-bold mb-[4px]">Natural Activities</p>
                                                        <button
                                                            onClick={(e) => removeFields(e, index, naturalActivities, setNaturalActivities)}
                                                            className={"text-base lg:text-lg font-bold rounded-full"}
                                                        >
                                                            <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                        </button>
                                                    </div>

                                                    <div className="w-full" >
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Natural Activity {index + 1}</p>
                                                        <input
                                                            type="text"
                                                            name="activity"
                                                            value={naturalActivity.activity}
                                                            onChange={event => handleDynamicActivityInputChange(event, index, naturalActivities, setNaturalActivities)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            placeholder="Place of Residence"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px", borderStyle: "dashed" }} className="flex justify-center items-center">
                                        <div className="w-full" >
                                            <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                                <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                                    <button
                                                        onClick={(e) => addFields(e, naturalActivities, setNaturalActivities)}
                                                        type="button"
                                                        className={"text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                    >
                                                        <PlusIcon className="h-10 w-10" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xl:[60%] lg:w-[70%] w-[90%] grid grid-cols-1 gap-5 auto-rows-fr " >

                                        {localActivities.map((localActivity, index) => {
                                            return (

                                                <div key={index} style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }}>
                                                    <div className="w-full flex justify-between">
                                                        <p className="text-black font-bold mb-[4px]">Local Activities</p>
                                                        <button
                                                            onClick={(e) => removeFields(e, index, localActivities, setLocalActivities)}
                                                            className={"text-base lg:text-lg font-bold rounded-full"}
                                                        >
                                                            <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                        </button>
                                                    </div>

                                                    <div className="w-full" >
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Local Activity {index + 1}</p>
                                                        <input
                                                            type="text"
                                                            name="activity"
                                                            value={localActivity.activity}
                                                            onChange={event => handleDynamicActivityInputChange(event, index, localActivities, setLocalActivities)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            placeholder="Place of Residence"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px", borderStyle: "dashed" }} className="flex justify-center items-center">
                                        <div className="w-full" >
                                            <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                                <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                                    <button
                                                        onClick={(e) => addFields(e, localActivities, setLocalActivities)}
                                                        type="button"
                                                        className={"text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                    >
                                                        <PlusIcon className="h-10 w-10" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xl:[60%] lg:w-[70%] w-[90%] grid grid-cols-1 gap-5 auto-rows-fr " >

                                        {labourShortageActivities.map((labourShortageActivity, index) => {
                                            return (
                                                <div key={index} style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }}>
                                                    <div className="w-full flex justify-between">
                                                        <p className="text-black font-bold mb-[4px]">Labour Shortage Activities</p>
                                                        <button
                                                            onClick={(e) => removeFields(e, index, labourShortageActivities, setLabourShortageActivities)}
                                                            className={"text-base lg:text-lg font-bold rounded-full"}
                                                        >
                                                            <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                        </button>
                                                    </div>

                                                    <div className="w-full" >
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Labour Shortage Activity {index + 1}</p>
                                                        <input
                                                            type="text"
                                                            name="activity"
                                                            value={labourShortageActivity.activity}
                                                            onChange={event => handleDynamicActivityInputChange(event, index, labourShortageActivities, setLabourShortageActivities)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            placeholder="Place of Residence"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px", borderStyle: "dashed" }} className="flex justify-center items-center">
                                        <div className="w-full" >
                                            <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                                <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                                    <button
                                                        onClick={(e) => addFields(e, labourShortageActivities, setLabourShortageActivities)}
                                                        type="button"
                                                        className={"text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                    >
                                                        <PlusIcon className="h-10 w-10" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </form>

                    </div></div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default RegisterQuest;