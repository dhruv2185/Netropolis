
import Article from "../components/globals/Article.jsx";
import Header from "../components/globals/Header.jsx";
import navigations  from "../data/navigations.json";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const DestinationPage = ({ destinations, destinationCategories }) => {
  const results=destinations;
  //yaha pe fetch request marni h to get quest data aur fir results ko set karna h
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
                  className="bg-transparent placeholder-indigo-200 flex-1 w-full text-sm text-white focus:outline-none active:outline-none"
                  placeholder="Search anything..."
                />
              </div>
              <div className="w-20">
                <button className="text-indigo-400 font-bold bg-white rounded-full w-full py-2 px-3">
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
