
import { toast } from "react-toastify";
import Footer from "../components/globals/Footer.jsx";
import Header from "../components/globals/Header.jsx";
import QuestList from "../components/globals/QuestList.jsx";
import navigations from "../data/navigations.json";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const ViewCMQuests = () => {

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo === null || userInfo.role !== "cm") {
      toast.error("Please login to continue.");
      navigate('/');
    }
    else
      fetchQuestsForCM();
  }, []);
  const fetchQuestsForCM = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/get_quest_by_cm/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${tokens.access}`
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error('Something went wrong. Please try again later.')
      }
      else {
        if (Array.isArray(data))
          setResults(data);
        else
          setResults([data]);
      }
    }
    catch (err) {
      toast.error("Failed to fetch quest details.Please check your connection and try again later.");
    }
    setLoading(false);
  }
  return (<>
    <Header navigations={navigations} />
    <main className="w-full flex pt-20 justify-center flex-col items-start">
      {!loading && <QuestList data={results} />}
      {loading && <div className="w-full min-h-[80vh] flex justify-center items-center"><AppLoader /></div>}
    </main>
    <Footer navigations={navigations} /></>
  );
};

export default ViewCMQuests;
