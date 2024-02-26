import Footer from "../components/globals/Footer";
import Header from "../components/globals/Header";
import navigations from "../data/navigations.json";




const Error404Page = () => {
    return (<>
        <Header navigations={navigations} />
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="flex flex-col justify-center items-center">
                <h1 className=" text-indigo-400 font-extrabold text-[30px]">404</h1>
                <p className=" text-indigo-800 font-bold">Page not found</p></div>
        </div>
        <Footer navigations={navigations} />
    </>
    );
}
export default Error404Page;