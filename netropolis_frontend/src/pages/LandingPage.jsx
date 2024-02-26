import Hero from "../components/homepage/Hero.jsx";
import PopularSearch from "../components/homepage/PopularSearch.jsx";
import Destination from "../components/homepage/Destination.jsx";
import Activity from "../components/homepage/Activity.jsx";
import Map from "../components/homepage/Map.jsx";
import Header from "../components/globals/Header.jsx";
import navigations from "../data/navigations.json";
import Footer from "../components/globals/Footer.jsx";
const LandingPage = ({ destinations, activities }) => {
    return (
        <>
            <Header navigations={navigations}></Header>
            <Hero />
            {/* <PopularSearch destinations={destinations} />
            <Destination destinations={destinations} /> */}
            <Activity activities={activities} />
            <Map destinations={destinations} />
            <Footer navigations={navigations} />
        </>
    );
};

export default LandingPage;
