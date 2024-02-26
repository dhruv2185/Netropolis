import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignUpMutation } from "../../features/slices/usersApiSlice";
import { setCredentials, setTokens } from "../../features/slices/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppLoader from "../../utils/AppLoader";
import { AppError } from "../../utils/AppError";
import Button from "../../components/globals/Button";
import Header from "../../components/globals/Header";
import navigations from "../../data/navigations.json";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;
import { signUpRequest, fetchUserProfile } from "../../features/userFunctions";

const initialState = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
};

const Register = () => {
    const [userData, setUserData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [{ isLoading }] = useSignUpMutation();

    //  Handle input
    const handleInputChange = (e) => {
        setUserData((userData) => ({
            ...userData,
            [e.target.name]: e.target.value,
        }));
    };
    const { userInfo, tokens } = useSelector((state) => state.auth);
    if (userInfo) {
        navigate("/");
    }

    const success = async (codeResponse) => {
        try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            }
            )
            if (!res.ok) {
                throw Error('Failed to get user profile')
            }
            const data = await res.json();
            const username = data.email.split('@')[0];
            const pwd = data.sub + "@" + username;
            const userProfile = {
                first_name: data.given_name,
                last_name: data.family_name,
                username: username,
                email: data.email,
                password: pwd,
                password2: pwd
            };

            const currData = await signUpRequest(userProfile);
            if (currData.error?.message) {
                throw new Error(currData.error.message)
            }
            const currTokens = {
                access_google: codeResponse.access_token,
                access: currData.access,
                refresh: currData.refresh,
            };
            const user = await fetchUserProfile(currTokens);
            if (user.error?.message) {
                throw new Error(user.error.message)
            }
            dispatch(setCredentials({ ...user, role: "user" }));
            dispatch(setTokens({ ...currTokens }));
            navigate("/");
            toast.success("Signup is successful");
        } catch (err) {
            setLoading(false);
            toast.error(err?.data?.message || err.error?.message);
        }
    }

    const login = useGoogleLogin({
        onSuccess: success,
        onError: (error) => {
            console.log('Login Failed:', error)
            toast.error("Login Failed");
        },
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.username || !userData.email || !userData.password || !userData.password2 || !userData.first_name || !userData.last_name) {
            return toast.error("All fields are required");
        }
        if (userData.password.length < 6) {
            return toast.error("Password must contain atleast 6 characters");
        }
        if (userData.password !== userData.password2) {
            return toast.error("Passwords do not match");
        }

        const userInfo = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            password2: userData.password2,
        };
        setLoading(true);
        try {
            const data = await signUpRequest(userInfo);
            if (data.error?.message) {
                throw new Error(data.error.message)
            }
            const currTokens = {
                ...tokens,
                access: data.access,
                refresh: data.refresh,
            };

            const user = await fetchUserProfile(currTokens);
            if (user.error?.message) {
                throw new Error(user.error.message)
            }
            dispatch(setCredentials({ ...user, role: "user" }));
            dispatch(setTokens({ ...currTokens }));
            navigate("/");
            toast.success("Signup is successful");
        } catch (err) {
            setLoading(false);
            toast.error(err?.data?.message || err.error?.message);
        }
    };
    return (
        <>
            <Header navigations={navigations} ></Header>
            <div className="flex w-full bg-white">
                {/* left side */}
                <div className="relative sm:flex justify-center items-center flex-1 w-full bg-cover bg-center " style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/3422595.jpg")', position: 'relative' }}>
                    <div className="flex flex-col h-[100vh] justify-between w-full flex-1">
                        <div className="flex justify-end p-1">
                            {/* <div
                            className="text-[#2A6476] cursor-pointer"
                            onClick={handleHomeNavigation}
                        >
                            Exit
                        </div> */}
                        </div>

                        <div className="justify-center flex gap-2 flex-col text-center items-center">
                            <p className="font-fira text-medium text-4xl text-[#faebd7]">
                                Create Account
                            </p>
                            <p className=" text-[#faebd7] mb-2">Unlock amazing travel experiences</p>
                        </div>

                        {<AppError />}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                <div className="flex flex-row gap-10">
                                    <div>
                                        <p className="text-indigo-400 font-inter mb-[4px]">First Name</p>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={userData.first_name}
                                            onChange={handleInputChange}
                                            className="w-md text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"

                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <p className="text-indigo-400 font-inter mb-[4px]">Last Name</p>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={userData.last_name}
                                            onChange={handleInputChange}
                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"

                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-indigo-400 font-inter mb-[4px]">Username</p>
                                    <input
                                        type="text"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleInputChange}
                                        className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"

                                        placeholder="Username"
                                    />
                                </div>
                                <div className="w-full">
                                    <p className="text-indigo-400 font-inter mb-[4px]">Email Address</p>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"

                                        placeholder="Enter Your Email"
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="text-indigo-400 font-inter mb-[4px]">
                                        Set a new password
                                    </p>
                                    <div style={{ position: "relative" }}>
                                        <input
                                            type={visible ? "text" : "password"}
                                            name="password"
                                            value={userData.password}
                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px] relative  pr-[30px]"
                                            onChange={handleInputChange}

                                            placeholder="Password"
                                        />
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                right: "10px",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {visible ? (
                                                <AiOutlineEye size={25} />
                                            ) : (
                                                <AiOutlineEyeInvisible size={25} />
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <p className="text-indigo-400 font-inter mb-[4px]">
                                        Confirm password
                                    </p>
                                    <div style={{ position: "relative" }}>
                                        <input
                                            type={visible ? "text" : "password"}
                                            name="password2"
                                            value={userData.password2}
                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px] relative pr-[30px]"
                                            onChange={handleInputChange}

                                            placeholder="Confirm Password"
                                        />
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                right: "10px",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {visible ? (
                                                <AiOutlineEye size={25} />
                                            ) : (
                                                <AiOutlineEyeInvisible size={25} />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <div className="justify-center w-full flex gap-2 flex-col text-center items-center">
                                        <Button text={isLoading && loading ? <AppLoader /> : "Sign Up"} customClass={"w-full"} loading={isLoading} ></Button>
                                    </div>
                                    <h2 className=" text-indigo-300 font-extrabold rounded-full bg-slate-100 px-2">OR</h2>
                                    <div className="justify-center w-full flex gap-2 flex-col text-center items-center">
                                        <button
                                            className={`w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full`}
                                            disabled={loading}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                login()
                                            }}
                                        > Sign Up with Google
                                        </button>
                                    </div></div>
                            </div>
                        </form>
                        <p className=" text-center  mx-auto w-[350px] text-[white]">
                            By continuing you accept our standard
                            <span className="underline px-2 text-indigo-400">
                                terms and conditions
                            </span>
                            and our{" "}
                            <span className=" px-2 underline text-indigo-400">
                                privacy policy.
                            </span>
                        </p>
                        <p className="text-center font-medium flex justify-center pb-4 text-[white] ">
                            Already have an account?&nbsp;
                            <Link to="/login" className="text-indigo-400">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
