import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AppLoader from "../../utils/AppLoader";
import { AppError } from "../../utils/AppError";

import { PlusIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import mesh from "../../assets/images/mesh.png";
import Footer from "../../components/globals/Footer";
import Header from "../../components/globals/Header";
import navigations from "../../data/navigations.json";

const RegisterTaskPage = () => {
    const [tasks, setTasks] = useState([
        {
            description: "",
            created_by: "",
        }
    ])

    const userInfo = useSelector((state) => state.auth.userInfo);
    // console.log(userInfo);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo === null || userInfo.role !== "cm") {
            // console.log("redirecting to login");
            toast.error("Please login as Community Manager to continue.")
            navigate('/')
        }
    }, []);

    const tokens = useSelector((state) => state.auth.tokens);
    // console.log("tokens", tokens);

    // Handle Input Change
    const handleDynamicActivityInputChange = (e, index, activities, setActivities) => {
        const values = [...activities];
        values[index][e.target.name] = e.target.value;
        setActivities(values);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            tasks.forEach((task) => {
                if (task.description === "") {
                    throw Error("Please fill in all the fields.");
                }
                task.created_by = userInfo?.cm_id;
            })
            const toBeSent = tasks;
            // console.log(toBeSent);
            const res = await fetch("http://localhost:8000/tasks/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + tokens.access
                },
                body: JSON.stringify(toBeSent)
            }
            )
            const data = await res.json();
            if (!res.ok) {
                // console.log(data);
                throw Error("Error in creating tasks. Please Try Again");
            }
            toast.success("Tasks Created Successfully");
            navigate("/");
        }
        catch (err) {
            toast.error(err.message);
            // console.log(err);
        }

    };

    const addFields = (e, activities, setActivities) => {
        e.preventDefault();
        setActivities([...activities, { description: "" }]);
    }
    const removeFields = (e, index, activities, setActivities) => {
        e.preventDefault();
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
                                Create Tasks
                            </p>
                            <p className="mb-2">Welcome to the Task Creation Interface!   </p>
                        </div>

                        {<AppError />}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center justify-center w-full"
                        >
                            <div className="flex flex-col xl:flex-row pr-2 pl-2 justify-center items-center w-[50%] max-md:w-full lg:w-[70%]">
                                <div className="w-full flex-col flex justify-center items-center">

                                    <div className="xl:[60%] lg:w-[70%] w-[90%] grid grid-cols-1 gap-5 auto-rows-fr " >

                                        {tasks.map((task, index) => {
                                            return (
                                                <div key={index} style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }}>
                                                    <div className="w-full flex justify-between pb-2">
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Task {index + 1}</p>
                                                        <button
                                                            onClick={(e) => removeFields(e, index, tasks, setTasks)}
                                                            className={"text-base lg:text-lg font-bold rounded-full"}
                                                        >
                                                            <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                        </button>
                                                    </div>

                                                    <div className="w-full" >
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            value={task.description}
                                                            onChange={event => handleDynamicActivityInputChange(event, index, tasks, setTasks)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                            placeholder="Enter Task Description"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className=" w-full flex flex-col items-center justify-center xl:self-start gap-4">
                                            <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center w-80">
                                                <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-row text-center items-center">
                                                    <button
                                                        onClick={handleSubmit}
                                                        className={"w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                    >
                                                        Submit
                                                    </button>
                                                    <button
                                                        onClick={(e) => { addFields(e, tasks, setTasks) }}
                                                        className={"w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                    >
                                                        Add Task
                                                    </button>
                                                </div>
                                            </div>
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

export default RegisterTaskPage;