
import { toast } from "react-toastify";
import Article from "../components/globals/Article.jsx";
import Header from "../components/globals/Header.jsx";
import navigations from "../data/navigations.json";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;

const DestinationPage = ({ destinations, destinationCategories }) => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //yaha pe fetch request marni h to get quest data aur fir results ko set karna h

  const tokens = JSON.parse(localStorage.getItem("tokens"));
  // const {userInfo, tokens} = useSelector((state) => state.auth);

  const fetchSearchedQuests = async () => {
    try {
      const res = await fetch(`${baseUrl}/search/?query=${searchQuery}`, {
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
  }

  return (
    <>
      <Header navigations={navigations} />
      <main className="w-full flex pt-20 justify-center flex-col items-start">
        <footer className="w-full flex justify-center items-center">
          <form
            action=""
            className="bg-indigo-400 my-10 lg:my-5 max-w-md w-full gap-4 rounded-full p-2 flex justify-center items-center"
          >
            <div className="w-8 flex justify-center items-center aspect-square">
              <MagnifyingGlassIcon className="w-5 text-white" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="searchQuery"
                className="bg-transparent placeholder-indigo-200 flex-1 w-full text-sm text-white focus:outline-none active:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
              />
            </div>
            <div className="w-20">
              <button className="text-indigo-400 font-bold bg-white rounded-full w-full py-2 px-3"
                onClick={(e) => {
                  e.preventDefault();
                  fetchSearchedQuests();
                }}
              >
                Search
              </button>
            </div>
          </form>
        </footer>
        <Article data={results} categories={destinationCategories} />
      </main></>
  );
};

export default DestinationPage;
