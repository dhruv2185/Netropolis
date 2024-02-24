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

import Button from "../components/globals/Button";
import { PlusIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import mesh from "../assets/images/mesh.png";
import Footer from "../components/globals/Footer";
import Header from "../components/globals/Header";
import navigations from "../data/navigations.json";
import TeamArticle from "../components/globals/TeamArticle";

const ViewTeams = () => {
    const dummyTeams = [
        {
            id: 1,
            team_name: "Team A",
            composition: "Designers, Developers, Project Managers",
            expectations_for_the_platform: "To deliver high-quality projects on time",
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
            expectations_for_the_platform: "To increase brand visibility and engagement",
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
    ]
    const [teams, setTeams] = useState()

    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

    const fetchTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams/?pk=${userInfo.user_profile.username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens.access}`
                }
            });
            if (response.ok) {
                console.log(response);
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data)) {
                    setTeams(data);
                }
                else {
                    const newdata = [data];
                    console.log(newdata)
                    setTeams(newdata);
                }
            }
            else {
                throw new Error(data.message);
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();
    const tokens = useSelector((state) => state.auth.tokens);

    useEffect(() => {
        if (userInfo === null) {
            console.log("redirecting to login");
            toast.error("Please login to continue.")
            navigate('/')
        }
        else
            fetchTeams();
    }, [tokens]);


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
                                Your Teams
                            </p>
                            <p className="mb-2">You can view all the teams here
                            </p>
                        </div>
                        {<AppError />}
                        {teams && teams.length > 0 && <TeamArticle teams={teams} />}
                        {teams && teams.length === 0 && <p className="font-fira text-medium text-xl text-indigo-400 self-center">
                            You currently have no teams. Please create one to view it here.
                        </p>}
                        <Button text="Create Team" path={"/team-registration"} customClass={"max-w-md self-center my-10"} />

                    </div>
                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ViewTeams;