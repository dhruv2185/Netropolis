import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, setTokens } from "../features/slices/authSlice";
import AppLoader from "../utils/AppLoader";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../features/slices/usersApiSlice";
import Button from "../components/globals/Button";
import Title from "../components/globals/Title";
import navigations from "../data/navigations.json";
import Header from "../components/globals/Header";
const ApplicationPage = () => {

    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate("/");
    //     }
    // }, [navigate, userInfo]);

    // target quest id from params
    // user id from userInfo or can get in the backend
    // duration of stay  -> from date - to date
    // Time every day
    // special note
    // desired tasks -> tasks with more interest
    // team id

    const submitHandler = async (e) => {
    };

    return (
        <>
            <Header navigations={navigations} ></Header>
            <div className="relative xs:flex justify-center items-center flex-1 w-full bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/3422583.jpg")', position: 'relative' }}>
                <div className="flex h-screen bg-transparent">

                    <div className="w-full flex justify-center items-center bg-transparent">
                        <div className="max-w-lg p-5 bg-transparent">
                            <div className="text-center mb-10">
                                <Title title="Welcome Again" subtitle={"Unlock amazing travel experiences"} titleClass={"text-[#faebd7]"} subtitleClass={"text-[#faebd7]"} />

                            </div>
                            <form onSubmit={submitHandler}>
                                <label
                                    htmlFor="email"
                                    className="text-[14px] font-inter text-indigo-400   "
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    name="username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    placeholder="Username"
                                    required
                                    className="w-full rounded-full placeholder-[var(--primary)] mb-5 border border-[#94a3b8] px-[12px] py-[8px]"
                                />

                                <p className="text-sm text-right mt-3 text-indigo-100 pb-2 mb-3">
                                    <Link to="/forgotpassword">Forgot Password</Link>
                                </p>
                                <Button text={isLoading ? <AppLoader /> : "Sign In"} customClass={"w-full"} loading={isLoading} ></Button>
                            </form>
                            <p className="font-medium text-sm text-center mt-5 text-[white]">
                                Already have an account?{" "}
                                <Link to="/register" className="text-indigo-400">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplicationPage;
