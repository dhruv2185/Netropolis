import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Header from "../../components/globals/Header";
import Footer from "../../components/globals/Footer";
import navigations from "../../data/navigations.json";
import mesh from "../../assets/images/mesh.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppLoader from "../../utils/AppLoader";
const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
};
const ViewSchedulePage = () => {
    const { userInfo, tokens } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo === null || userInfo.role !== "user") {
            toast.error("Please login to continue.")
            navigate("/login");
        }
        else
            fetchScheduleData();
    }, [navigate, userInfo]);
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

    const [schedule, setSchedule] = useState([]);
    const { applicationId } = useParams();
    const fetchScheduleData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/get_schedule_by_application_id/?pk=${applicationId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens.access}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data);
                throw new Error('Something went wrong');
            }
            console.log(data);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    const [open, setOpen] = useState({ 1: false });
    const Icon = (id) => {
        return open[id] ? <ChevronUpIcon /> : <ChevronDownIcon />;
    };
    const handleOpen = ({ id }) => {
        setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
    };
    return (<>
        <Header navigations={navigations} />
        <div className="flex bg-transparent min-h-[100vh] w-full" >
            <div className="sm:flex justify-center  bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                {loading && <div className="w-full min-h-[80vh] flex justify-center items-center"><AppLoader /></div>}
                {!loading && <div className="flex flex-col mt-20">

                    <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                        <p className="font-fira text-medium text-4xl text-indigo-400">
                            Quest Schedule
                        </p>
                        <p className="mb-2">Please check all the details carefully  </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <div className="flex flex-col gap-4">
                            <strong className="text-lg text-center text-indigo-400">Start Date</strong>
                            <p className="text-center">10th August 2021</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <strong className="text-lg text-center text-indigo-400">End Date</strong>
                            <p className="text-center">10th August 2021</p>
                        </div>

                    </div>
                    <Accordion open={open[1]} animate={CUSTOM_ANIMATION}>
                        <AccordionHeader onClick={() => handleOpen(1)} icon={<Icon id={1} />}>
                            What is Material Tailwind?
                        </AccordionHeader>
                        <AccordionBody>
                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                            ourselves and actualize our dreams.
                        </AccordionBody>
                    </Accordion>
                </div>}</div></div>
        <Footer navigations={navigations} />
    </>);
};

export default ViewSchedulePage;