import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCredentials, setTokens } from "../features/slices/authSlice";
import AppLoader from "../utils/AppLoader";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { PlusIcon, MinusCircleIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { useLoginMutation } from "../features/slices/usersApiSlice";
import Button from "../components/globals/Button";
import Title from "../components/globals/Title";
import navigations from "../data/navigations.json";
import Header from "../components/globals/Header";
import mesh from "../assets/images/mesh.png";
import { AppError } from "../utils/AppError";
import Footer from "../components/globals/Footer";
const timeZone = "Asia/Tokyo"

const convertToEvent = (eventIfo, date) => {
    const toBeReturned = {
        summary: eventIfo.name,
        location: eventIfo.location,
        description: eventIfo.description,
        start: {
            dateTime: `${date}T${eventIfo.from}:00`,
            timeZone: timeZone,
        },
        end: {
            dateTime: `${date}T${eventIfo.to}:00`,
            timeZone: timeZone,
        },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'popup', minutes: 10 },
            ],
        }
    }
    return toBeReturned;
}


const ScheduleQuestPage = (props) => {
    // route : baseUrl/applications/applicationId
    useEffect(() => {
        if (userInfo) {
            toast.error("Please login to continue.")
            navigate("/");
        }
        else {
            fetchQuestData(questId)
            fetchTeamData(teamId)
        }
    }, [navigate, userInfo]);

    const fetchQuestData = async (questId) => {
        try {
            const response = await fetch(`${BASE_URL}/quest/${questId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${tokens.access}`
                }
            }
            )
            if (!response.ok) {
                throw new Error('Failed to fetch quest data. Please try again later.');
            }
            const data = await response.json();
            console.log(data);
            setQuestData(data);
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    const fetchTeamData = async (teamId) => {
        try {
            const response = await fetch(`${BASE_URL}/team/${teamId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${tokens.access}`
                }
            }
            )
            if (!response.ok) {
                throw new Error('Failed to fetch team data. Please try again later.');
            }
            const data = await response.json();
            setTeamData(data);
            console.log(data);
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    const [team_data, setTeamData] = useState(dummy_team_data)
    const [quest_data, setQuestData] = useState(dummy_quest_data)

    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

    const { applicationId } = useParams();
    const { questId, teamId } = props.appInfo;
    const navigate = useNavigate();

    const { userInfo, tokens } = useSelector((state) => state.auth);

    const [schedule, setSchedule] = useState({
        createdBy: CMInfo.id,
        start_date: "",
        end_date: "",
        questId: questId,
        application_id: applicationId
    })

    const [days, setDays] = useState([
        {
            date: "",
            events: [
                {
                    name: "",
                    from: "",
                    to: "",
                    description: "",
                    location: ""
                }
            ]
        }
    ])

    // start date 
    // end date
    // day to day Schedule 
    //           date, add event -> event info { name, from, to, description, location}

    const addDay = (e) => {
        e.preventDefault();
        setDays([...days, {
            date: "",
            events: [
                {
                    name: "",
                    from: "",
                    to: "",
                    description: "",
                    location: ""
                }
            ]
        }])
    }

    const removeDay = (e, index) => {
        e.preventDefault();
        let newDays = [...days];
        newDays.splice(index, 1);
        setDays(newDays);
    }

    const addEvent = (e, index) => {
        e.preventDefault();
        let newDays = [...days];
        newDays[index].events.push({
            name: "",
            from: "",
            to: "",
            description: "",
            location: ""
        })
        setDays(newDays);
    }

    const removeEvent = (e, index, ind) => {
        e.preventDefault();
        let newDays = [...days];
        newDays[index].events.splice(ind, 1);
        setDays(newDays);
    }

    const handleMainInputChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value });
    }

    const handleDayInputChange = (e, index) => {
        let newDays = [...days];
        newDays[index][e.target.name] = e.target.value;
        setDays(newDays);
    }

    const handleEventInputChange = (e, index, ind) => {
        let newDays = [...days];
        newDays[index].events[ind][e.target.name] = e.target.value;
        setDays(newDays);
    }
    const dummy_team_data = {

        team_name: "Team Rocket",
        compostion: "Jessie, James, Meowth",
        expectations_for_the_platform: "To blast off at the speed of light!",
        concerns: "To protect the world from devastation!",
        members: [
            {
                name: "Jessie",
                age: 25,
                gender: "Female",
                place_of_residence: "Kanto",
                occupation: "Pokemon Trainer",
            }
            ,
            {
                name: "James",
                age: 25,
                gender: "Male",
                place_of_residence: "Kanto",
                occupation: "Pokemon Trainer",
            },
            {
                name: "Meowth",
                age: 25,
                gender: "Male",
                place_of_residence: "Kanto",
                occupation: "Pokemon",
            }
        ]

    }
    const dummy_quest_data = {
        quest_name: "Pokemon Quest",
        region: "Kanto",
        genre_tags: ["Pikachu", "Bulbasaur", "Charizard", "Squirtle", "Mewtwo"],
        rewards: "$8000",
        other_information: "I wanna be the very best, like no one ever was. To catch them is my real test, to train them is my cause.",
        available_till: Date.now(),
        duration: {
            start_date: Date.now(),
            end_date: Date.now()
        }
        ,
        special_notes: "This is a special note for the quest",
        desired_tasks: "Catch them all!",
        daily_time_span: "10:00 AM - 6:00 PM",
        team: {
            team_name: "Team Rocket",
            compostion: "Jessie, James, Meowth",
            expectations_for_the_platform: "To blast off at the speed of light!",
            concerns: "To protect the world from devastation!",
            members: [
                {
                    name: "Jessie",
                    age: 25,
                    gender: "Female",
                    place_of_residence: "Kanto",
                    occupation: "Pokemon Trainer",
                }
                ,
                {
                    name: "James",
                    age: 25,
                    gender: "Male",
                    place_of_residence: "Kanto",
                    occupation: "Pokemon Trainer",
                },
                {
                    name: "Meowth",
                    age: 25,
                    gender: "Male",
                    place_of_residence: "Kanto",
                    occupation: "Pokemon",
                }
            ]
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const bodyToBeSent = {
            ...schedule,
            application_id: 14597,
            day_to_day_schedule: days,
        }
        console.log(bodyToBeSent);
        try {
            for (let i = 0; i < days.length; i++) {
                const currDate = days[i].date;
                for (let j = 0; j < days[i].events.length; j++) {
                    const eventInfo = days[i].events[j];
                    const event = convertToEvent(eventInfo, currDate);
                    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Bearer ${tokens.access_google}`
                        },
                        body: JSON.stringify(event)
                    }
                    )
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    const data = await response.json();
                    console.log(data);
                }
            }
            const response = await fetch(`${BASE_URL}/quest/schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${tokens.access}`
                },
                body: JSON.stringify(bodyToBeSent)
            }
            )
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            console.log(data);
        }
        catch (err) {
            toast.error(err.message);
        }

    };

    return (
        <><Header navigations={navigations} />
            <div className="flex bg-transparent h-auto w-full" >
                {/* left side */}
                <div className="sm:flex justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                    <div className="lg:flex flex-1 w-full max-md:mt-20 mt-10 min-h-[120vh]">
                        <div className="sm:w-full lg:max-w-[65%]  flex flex-col justify-center items-center">
                            <div className="text-center mb-10 mt-10">
                                <Title title="Quest and Application Summary" subtitle={"Please check all details carefully"} titleClass={"text-indigo-400"} />
                            </div><div className="lg:flex"><div className="flex flex-col gap-2 md:max-w-lg md:pl-[5%] w-full max-md:items-center max-md:justify-center max-md:p-10">
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
                                <div className="flex flex-col gap-2 md:max-w-lg md:pl-[5%] w-full max-md:items-center max-md:justify-center max-md:p-10"><h2 className=" font-bold text-xl text-indigo-400 font-inter"> Team</h2>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-medium text-indigo-400 font-inter"> Team Name</h3>
                                        <p className="text-black font-inter mb-4">{quest_data.team.team_name}</p>
                                        <h3 className="font-medium text-indigo-400 font-inter"> Composition</h3>
                                        <p className="text-black font-inter mb-4">{quest_data.team.compostion}</p>
                                        <h3 className="font-medium text-indigo-400 font-inter"> Expectations for the Platform</h3>
                                        <p className="text-black font-inter mb-4">{quest_data.team.expectations_for_the_platform}</p>
                                        <h3 className="font-medium text-indigo-400 font-inter"> Concerns</h3>
                                        <p className="text-black font-inter mb-4">{quest_data.team.concerns}</p>

                                    </div>

                                    <h2 className="font-medium text-indigo-400 font-inter"> Special Notes</h2>
                                    <p className="text-black font-inter mb-4">{quest_data.special_notes}</p>
                                    <h2 className="font-medium text-indigo-400 font-inter"> Desired Tasks</h2>
                                    <p className="text-black font-inter mb-4">{quest_data.desired_tasks}</p>
                                    <h2 className="font-medium text-indigo-400 font-inter"> Daily Time Span</h2>
                                    <p className="text-black font-inter mb-4">{quest_data.daily_time_span}</p>
                                    <h2 className="font-bold text-lg text-indigo-400 font-inter"> Duration of Stay</h2>
                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="w-full">
                                            <h3 className="font-medium text-indigo-400 font-inter">Start Date</h3>
                                            <p className="text-black font-inter mb-4">{new Date(quest_data.duration.start_date).toDateString()}</p>
                                        </div>
                                        <div className="w-full">
                                            <h3 className="font-medium text-indigo-400 font-inter">End Date</h3>
                                            <p className="text-black font-inter mb-4">{new Date(quest_data.duration.end_date).toDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <h3 className="font-bold text-xl text-indigo-400 font-inter "> Members</h3>
                            <div className="gap-10 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 m-3">
                                {
                                    team_data.map((member, index) => (
                                        <div key={index} className="flex flex-col gap-5 min-w-[300px]" style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px", borderStyle: "dashed" }}>
                                            <div className="flex justify-between gap-16">
                                                <div>
                                                    <h3 className="font-medium text-indigo-400 font-inter"> Name</h3>
                                                    <p className="text-black font-inter mb-4">{member.name}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-indigo-400 font-inter"> Age</h3>
                                                    <p className="text-black font-inter mb-4">{member.age}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-indigo-400 font-inter">Gender</h3>
                                                    <p className="text-black font-inter mb-4">{member.gender}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-indigo-400 font-inter">Address</h3>
                                                <p className="text-black font-inter mb-4">{member.place_of_residence}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-indigo-400 font-inter"> Occupation</h3>
                                                <p className="text-black font-inter mb-4">{member.occupation}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-col h-auto min-h-[100vh] w-full flex-1 mb-5 mt-10 max-h-[160vh] overflow-auto">
                            {/* <div className="flex justify-end p-1"></div> */}

                            <div className="text-center mb-10">
                                <Title title="Create Schedule" subtitle={"Please create a SCHEDULE for the quest"} titleClass={"text-indigo-400"} />
                            </div>

                            {<AppError />}

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col items-center justify-center "
                            >
                                <div className="flex flex-col xl:flex-row pr-2 pl-2 justify-center items-center w-full">
                                    <div className="xl:w-[60%] lg:w-[70%] w-full flex flex-col items-center justify-center xl:self-start gap-4">
                                        <div className="flex flex-row gap-10">
                                            <div className="w-full">
                                                <p className="text-indigo-400 font-inter mb-[4px]">Start Date</p>
                                                <input
                                                    type="date"
                                                    name="start_date"
                                                    value={schedule.start_date}
                                                    onChange={event => handleMainInputChange(event)}
                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <p className="text-indigo-400 font-inter mb-[4px]">End Date</p>
                                                <input
                                                    type="date"
                                                    name="end_date"
                                                    value={schedule.end_date}
                                                    onChange={event => handleMainInputChange(event)}
                                                    className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#695252] focus:outline-none h-[35px]"
                                                />
                                            </div>
                                        </div><div className="flex gap-2">
                                            <p className="text-indigo-400 font-inter font-bold text-lg">Day to Day Schedule  </p><button
                                                onClick={(e) => addDay(e)}
                                                type="button"
                                                className={"text-base text-white bg-indigo-400 font-bold rounded-full px-2 inline-flex items-center justify-center gap-1"}
                                            >
                                                <PlusIcon className="h-5 w-5" />
                                                DAY
                                            </button></div>

                                        {days.map((day, index) => (
                                            <>
                                                <div key={index} style={{ border: "1px solid #A6A6A6", borderRadius: "8px", padding: "15px" }} className="min-w-[100%]">
                                                    <div className="w-full flex justify-between">
                                                        <p className="text-black font-bold mb-[4px]">Day {index + 1}</p>
                                                        <button
                                                            onClick={(e) => removeDay(e, index)}
                                                            className={"text-base lg:text-lg font-bold rounded-full"}
                                                        >
                                                            <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                        </button>
                                                    </div>
                                                    <div className="w-full">
                                                        <p className="text-indigo-400 font-inter mb-[4px]">Date</p>
                                                        <input
                                                            type="date"
                                                            name="date"
                                                            value={day.date}
                                                            onChange={event => handleDayInputChange(event, index)}
                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                        />
                                                    </div>
                                                    <div className="w-full flex justify-center items-center gap-2 m-2">
                                                        <p className="text-indigo-400 font-inter font-bold text-lg">EVENTS  </p><button
                                                            onClick={e => addEvent(e, index)}
                                                            type="button"
                                                            className={"text-base text-white bg-indigo-400 font-bold rounded-full px-2 inline-flex items-center justify-center gap-1"}
                                                        >
                                                            <PlusIcon className="h-5 w-5" />
                                                            EVENT
                                                        </button>
                                                    </div>
                                                    {day.events.map((currentEvent, ind) => (
                                                        <>
                                                            <div key={ind} style={{ border: "1px dashed #A6A6A6", borderRadius: "8px", padding: "15px" }} className="m-2">
                                                                <div className="w-full flex justify-between">
                                                                    <p className="text-black font-bold mb-[4px]">Event {ind + 1}</p>
                                                                    <button
                                                                        onClick={(e) => removeEvent(e, index, ind)}
                                                                        className={"text-base lg:text-lg font-bold rounded-full"}
                                                                    >
                                                                        <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                                                                    </button>
                                                                </div>
                                                                <div className="w-full" >
                                                                    <p className="text-indigo-400 font-inter mb-[4px]">Name</p>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={currentEvent.name}
                                                                        onChange={event => handleEventInputChange(event, index, ind)}
                                                                        className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                        placeholder="Event Name"
                                                                    />
                                                                </div>
                                                                <div className="w-full" >
                                                                    <p className="text-indigo-400 font-inter mb-[4px]">Location</p>
                                                                    <input
                                                                        type="text"
                                                                        name="location"
                                                                        value={currentEvent.location}
                                                                        onChange={event => handleEventInputChange(event, index, ind)}
                                                                        className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                        placeholder="Location"
                                                                    />
                                                                </div>
                                                                <div className="w-full" >
                                                                    <p className="text-indigo-400 font-inter mb-[4px]">Description</p>
                                                                    <input
                                                                        type="text"
                                                                        name="description"
                                                                        value={currentEvent.description}
                                                                        onChange={event => handleEventInputChange(event, index, ind)}
                                                                        className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                        placeholder="Location"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-row gap-10 w-full">
                                                                    <div className="w-full">
                                                                        <p className="text-indigo-400 font-inter mb-[4px]">Starts At</p>
                                                                        <input
                                                                            type="time"
                                                                            name="from"
                                                                            value={currentEvent.from}
                                                                            onChange={event => handleEventInputChange(event, index, ind)}
                                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                        />
                                                                    </div>
                                                                    <div className="w-full">
                                                                        <p className="text-indigo-400 font-inter mb-[4px]">Ends At</p>
                                                                        <input
                                                                            type="time"
                                                                            name="to"
                                                                            value={currentEvent.to}
                                                                            onChange={event => handleEventInputChange(event, index, ind)}
                                                                            className="w-full text-black rounded-full pl-4 placeholder-[#A6A6A6] border border-[#A6A6A6] focus:outline-none h-[35px]"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}

                                                </div>

                                            </>
                                        ))}
                                        <div className="flex flex-col pr-2 pl-2 gap-4 justify-center items-center">
                                            <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                                                <button
                                                    onClick={handleSubmit}
                                                    className={"w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full"}
                                                >
                                                    Submit Schedule
                                                </button>
                                            </div>
                                        </div>

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

export default ScheduleQuestPage;


