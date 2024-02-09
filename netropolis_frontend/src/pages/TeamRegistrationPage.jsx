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

const TeamRegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [teamData, setTeamData] = useState({
        team_name: "",
        composition: "",
        expectations_for_the_platform: "",
        concerns: "",
    });

    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userInfo === null) {
    //         console.log("redirecting to login");
    //         navigate('/login')
    //     }
    // }, []);

    const tokens = useSelector((state) => state.auth.tokens);
    console.log("tokens", tokens);

    const [signUp, { isLoading }] = useSignUpMutation();

    //  Handle input
    const handleInputChange = (event, index) => {
        console.log("change karne ki koshish toh ho rahi");
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        console.log(values);
        setInputFields(values);
    };

    const handlePrimaryInputChange = (e) => {
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        console.log("yeh chal gaya bc");
        e.preventDefault();
        try {
            if (teamData.team_name === "" || teamData.composition === "" || teamData.expectations_for_the_platform === "" || teamData.concerns === "") {
                return toast.error("All fields are required");
            }
            inputFields.forEach((field) => {
                if (field.name === "" || field.age === "" || field.gender === "" || field.place_of_residence === "" || field.occupation === "") {
                    return toast.error("All fields are required");
                }
            }
            );
            const b = { ...teamData, teamInfo: inputFields, number_of_people: inputFields.length };
            console.log(b);
            const res = await fetch(`${VITE_BASE_BACKEND_URL}/teams/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokens.access}`,
                },
                body: JSON.stringify({ ...teamData, teamInfo: inputFields, number_of_people: inputFields.length }),
            });
            if (!res.ok) {
                throw new Error("Error in creating team");
            }
            const data = await res.json();
            console.log(data);
            toast.success("Team created successfully");
            navigate("/");
        }
        catch (err) {
            toast.error(err.message);
            return;
        }


    };

    const [inputFields, setInputFields] = useState([
        { name: '', age: '', gender: '', place_of_residence: '', occupation: '' }
    ])

    const addFields = () => {
        console.log("chal toh raha hai");
        console.log(inputFields);
        setInputFields([...inputFields, { name: '', age: '', gender: '', place_of_residence: '', occupation: '' }
        ])
    }

    return (
        <div className="flex w-full bg-white">
            {/* left side */}
            <div className="relative sm:flex justify-center items-center flex-1 w-full bg-cover bg-center " style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/3422583.jpg")', position: 'relative' }}>
                <div className="flex flex-col h-[100vh] justify-between w-full flex-1">
                    <div className="flex justify-end p-1"></div>

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
                            <div className="w-full" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Team Name</p>
                                <input
                                    type="text"
                                    name="team_name"
                                    value={teamData.team_name}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Team Name"
                                />
                            </div>
                            <div className="w-full" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Composition</p>
                                <input
                                    type="text"
                                    name="composition"
                                    value={teamData.composition}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Composition"
                                />
                            </div>
                            <div className="w-full" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Expectations from the platform</p>
                                <input
                                    type="text"
                                    name="expectations_for_the_platform"
                                    value={teamData.expectations_for_the_platform}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Expectations from the platform"
                                />
                            </div>
                            <div className="w-full" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Concerns</p>
                                <input
                                    type="text"
                                    name="concerns"
                                    value={teamData.concerns}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Concerns"
                                />
                            </div>
                            {inputFields.map((inputField, index) => {
                                return (
                                    <div key={index}>
                                        <div className="w-full" >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Name</p>
                                            <input
                                                type="text"
                                                name="name"
                                                value={inputField.name}
                                                onChange={event => handleInputChange(event, index)}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="flex flex-row gap-10">
                                            <div>
                                                <p className="text-indigo-400 font-inter mb-[4px]">Age</p>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={inputField.age}
                                                    onChange={event => handleInputChange(event, index)}
                                                    className="w-md text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                    placeholder="Age"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <p className="text-indigo-400 font-inter mb-[4px]">Gender</p>
                                                <input
                                                    type="text"
                                                    name="gender"
                                                    value={inputField.gender}
                                                    onChange={event => handleInputChange(event, index)}
                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                    placeholder="Gender"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full" >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Occupation</p>
                                            <input
                                                type="text"
                                                name="occupation"
                                                value={inputField.occupation}
                                                onChange={event => handleInputChange(event, index)}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Occupation"
                                            />
                                        </div>
                                        <div className="w-full" >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Place of Residence</p>
                                            <input
                                                type="text"
                                                name="place_of_residence"
                                                value={inputField.place_of_residence}
                                                onChange={event => handleInputChange(event, index)}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Place of Residence"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                            <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                <button
                                    onClick={addFields}
                                    className={`w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full`}
                                >
                                    Add Member
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                            <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                <button
                                    onClick={handleSubmit}
                                    className={`w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full`}
                                >
                                    Submit Team
                                </button>
                            </div>
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
                </div></div>
        </div >
    );
};

export default TeamRegistrationPage;
