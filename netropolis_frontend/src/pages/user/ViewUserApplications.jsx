import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppLoader from "../../utils/AppLoader";
import { AppError } from "../../utils/AppError";

import { PlusIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import mesh from "../../assets/images/mesh.png";
import Footer from "../../components/globals/Footer";
import Header from "../../components/globals/Header";
import navigations from "../../data/navigations.json";
import UserApplicationList from "../../components/globals/UserApplicationList";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;

const ViewUserApplications = () => {



    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();
    const tokens = useSelector((state) => state.auth.tokens);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/applications/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens.access}`
                }
            })
            const data = await res.json();

            if (res.ok) {
                if (Array.isArray(data)) {
                    setApplications(data);
                }
                else {
                    setApplications([data]);
                }
            }
            else {
                throw Error(data.message)
            }
        } catch (err) {
            toast.error(err.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (userInfo === null || userInfo.role !== "user") {

            toast.error("Please login to continue.")
            navigate('/')
        }
        else
            fetchApplications();
    }, [tokens]);

    return (
        <><Header navigations={navigations} />
            <div className="flex bg-transparent h-auto w-full" >
                {/* left side */}
                <div className="sm:flex justify-center items-center bg-scroll flex-1 w-full bg-cover bg-center " style={{ backgroundImage: `url(${mesh})` }}>
                    {loading && <AppLoader customClass={"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"} />}
                    <div className="flex flex-col h-auto min-h-[100vh] w-full flex-1 mb-5 mt-32">
                        <div className="justify-center flex gap-2 flex-col text-center items-center mb-10">
                            <p className="font-fira text-medium text-4xl text-indigo-400">
                                My Applications
                            </p>
                            <p className="mb-2">You can view all your Applications here   </p>
                        </div>

                        {<AppError />}

                        {applications && applications.length > 0 && < UserApplicationList applications={applications} />}
                        {applications && applications.length === 0 && <p className="text-center text-lg text-neutral-400">No applications found</p>}
                    </div>
                </div>
            </div>
            <Footer navigations={navigations} />
        </>
    );
};

export default ViewUserApplications;