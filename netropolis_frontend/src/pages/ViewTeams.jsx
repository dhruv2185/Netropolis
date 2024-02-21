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
import TeamArticle from "../components/globals/TeamArticle";

const ViewTeams = () => {
    const [teams, setTeams] = useState([
        {
            id: 1,
            team_name: "Team A",
            composition: "Designers, Developers, Project Managers",
            expectations: "To deliver high-quality projects on time",
            concerns: "Resource allocation, Communication",
            members: [
              {
                name: "John Doe",
                age: 30,
                gender: "Male",
                occupation: "Designer",
                residence: "New York",
              },
              {
                name: "Jane Smith",
                age: 28,
                gender: "Female",
                occupation: "Developer",
                residence: "San Francisco",
              },
              // More members...
            ],
          },
          {
            id: 2,
            team_name: "Team B",
            composition: "Marketing Specialists, Content Writers",
            expectations: "To increase brand visibility and engagement",
            concerns: "Content quality, Audience targeting",
            members: [
              {
                name: "Alice Johnson",
                age: 35,
                gender: "Female",
                occupation: "Marketing Specialistddddd dfvdvfr dvgfvfdvd",
                residence: "Los Angeles",
              },
              {
                name: "Bob Thompson",
                age: 32,
                gender: "Male",
                occupation: "Content Writer",
                residence: "Chicago",
              },
              // More members...
            ],
          },
    ])

    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo === null) {
            console.log("redirecting to login");
            toast.error("Please login to continue.")
            navigate('/')
        }
    }, []);

    const tokens = useSelector((state) => state.auth.tokens);
    // console.log("tokens", tokens);

    // Handle Input Change
    // const handleDynamicActivityInputChange = (e, index, activities, setActivities) => {
    //     const values = [...activities];
    //     values[index][e.target.name] = e.target.value;
    //     setActivities(values);
    // }
    // const addFields = (e, activities, setActivities) => {
    //     e.preventDefault();
    //     setActivities([...activities, { description: "" }]);
    // }
    // const removeFields = (e, index, activities, setActivities) => {
    //     e.preventDefault();
    //     console.log("remove karne ki koshish");
    //     if (activities.length === 1) {
    //         toast.error("You cannot remove the only member of the team.");
    //         return;
    //     }
    //     const values = [...activities];
    //     values.splice(index, 1);
    //     setActivities(values);
    // }

    return (
        <><Header navigations={navigations} />
            <div className="flex bg-transparent h-auto w-full" >
                {/* left side */}
                <div className="sm:flex justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                    <div className="flex flex-col h-auto min-h-[100vh] w-full flex-1 mb-5 mt-32">
                        {/* <div className="flex justify-end p-1"></div> */}

                        <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                            <p className="font-fira text-medium text-4xl text-indigo-400">
                                View Teams
                            </p>
                            <p className="mb-2">You can view all the teams here
                               </p>
                        </div>
                        
                        {<AppError />}
                        <TeamArticle teams={teams} />
                        
                    </div>
                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ViewTeams;