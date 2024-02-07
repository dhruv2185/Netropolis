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
import mesh from "../assets/images/mesh.png";
import Footer from "../components/globals/Footer";
import Header from "../components/globals/Header";
import navigations from "../data/navigations.json";

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
                throw new Error("Please fill all the fields");
            }
            inputFields.forEach((field) => {
                if (field.name === "" || field.age === "" || field.gender === "" || field.place_of_residence === "" || field.occupation === "") {
                    throw new Error("Please fill all the fields");
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
        <><Header navigations={navigations}/>
        <div className="flex bg-transparent h-auto w-full" >
            {/* left side */}
            <div className="sm:flex justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                <div className="flex flex-col h-auto justify-between w-full flex-1 mt-20">
                    <div className="flex justify-end p-1"></div>

                    <div className="justify-center flex gap-2 flex-col text-center items-center">
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
                        <div className="flex pr-2 pl-2 justify-center items-center w-full">
                            <div className="w-[50%]">
                            <div className="w-8/12" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Team Name</p>
                                <input
                                    type="text"
                                    name="team_name"
                                    value={teamData.team_name}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Team Name"
                                    required
                                />
                            </div>
                            <div className="w-8/12" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Composition</p>
                                <input
                                    type="text"
                                    name="composition"
                                    value={teamData.composition}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Composition"
                                    required
                                />
                            </div>
                            <div className="w-8/12" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Expectations from the platform</p>
                                <input
                                    type="text"
                                    name="expectations_for_the_platform"
                                    value={teamData.expectations_for_the_platform}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Expectations from the platform"
                                    required
                                />
                            </div>
                            <div className="w-8/12" >
                                <p className="text-indigo-400 font-inter mb-[4px]">Concerns</p>
                                <input
                                    type="text"
                                    name="concerns"
                                    value={teamData.concerns}
                                    onChange={handlePrimaryInputChange}
                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                    placeholder="Concerns"
                                    required
                                />
                            </div></div>
                            <div></div>
                            <div className="w-[50%] gap-5" style={{display:"grid", gridTemplateColumns:"45% 45%"}}>
                            {inputFields.map((inputField, index) => {
                                return (
                                    <div  key={index} style={{border:"1px solid #A6A6A6", borderRadius:"8px", padding:"15px"}}>
                                        <div className="w-full" >
                                            <p className="text-indigo-400 font-inter mb-[4px]">Name</p>
                                            <input
                                                type="text"
                                                name="name"
                                                value={inputField.name}
                                                onChange={event => handleInputChange(event, index)}
                                                className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                placeholder="Name"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-row gap-10">
                                            <div>
                                                <p className="text-indigo-400 font-inter mb-[4px]">Age</p>
                                                <input
                                                    type="text"
                                                    name="age"
                                                    value={inputField.age}
                                                    onChange={event => handleInputChange(event, index)}
                                                    className="w-md text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                    placeholder="Age"
                                                    required
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
                                                    required
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
                                                required
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
                                                required
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div></div>
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
                    
                </div></div>
        </div >
        <Footer navigations={navigations}/>
        </>
    );
};

export default TeamRegistrationPage;
