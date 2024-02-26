import Slider from "../components/globals/Slider.jsx";
import Article from "../components/globals/Article.jsx";
import activities from "../data/activities.json";
const ViewCMQuests = () => {
    
  return (
    <main className="w-full flex pt-20 justify-center flex-col items-start">
        <Slider data={activities} />
      <Article data={[]} />
    </main>
  );
};

export default ViewCMQuests;