import Slider from "../components/globals/Slider.jsx";
import Article from "../components/globals/Article.jsx";
import activities from "../data/activities.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/globals/Header.jsx";
import navigations from "../data/navigations.json";
import Footer from "../components/globals/Footer.jsx";
import AppLoader from "../utils/AppLoader.jsx";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const ExploreQuestsPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  useEffect(() => {
    fetchAllQuests();
  }, []);
  const fetchAllQuests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/get_all_quests/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log("heh")
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
      toast.error(err);
    }
    setLoading(false);
  }
  return (<>
    <Header navigations={navigations} />
    <main className="w-full flex pt-20 justify-center flex-col items-start">
      {!loading && <><Slider data={activities} />
        <Article data={results} /></>}
      {loading && <div className="w-full min-h-[80vh] flex justify-center items-center"><AppLoader /></div>}
    </main>
    <Footer navigations={navigations} /></>

  );
};

export default ExploreQuestsPage;