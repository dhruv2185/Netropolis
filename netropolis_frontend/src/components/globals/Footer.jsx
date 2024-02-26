import {
  CursorArrowRaysIcon,
  BellAlertIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import instagramIcon from "../../assets/images/instagram.png";
import whatsappIcon from "../../assets/images/whatsapp.png";
import twitterIcon from "../../assets/images/twitter.png";
const metadata = {
  headline: ": Your Guide to the Best of Japan",
  description:
    "Netropolis supports a place where people with shared values can connect digitally to form and operate in a third-place-like community that is neither at home nor at work.",
  others: [
    { name: "Term and Conditions", path: "/term-and-conditions" },
    { name: "Privacy and Policy", path: "/privacy-and-policy" },
    { name: "Help Center", path: "/help-center" },
  ],
  socials: [
    { name: "instagram", path: "https://instagram.com/" },
    { name: "twitter", path: "https://twitter.com/" },
    { name: "facebook", path: "https://facebook.com/" },
  ],
};

const Footer = ({ navigations }) => {
  return (
    <footer className="w-full dark:bg-neutral-950 dark:border-neutral-800 bg-white border-t flex justify-center items-center">
      <div className="w-full gap-8 flex flex-col">
        {/*  TOP */}
        <div className="w-full flex gap-5 flex-col lg:flex-row p-8 lg:p-16">
          <div className="w-full lg:w-8/12">
            <h1 className="text-base flex lg:text-lg justify-start gap-1 items-center text-indigo-400 font-bold">
              <RocketLaunchIcon className="w-4 lg:w-5" />
              {import.meta.env.VITE_APP}
              <span className="hidden lg:inline">{metadata.headline}</span>
            </h1>
            <p className="text-sm lg:text-base text-neutral-600 my-2 w-full max-w-2xl">
              {metadata.description}
            </p>
          </div>

          <div className="w-full lg:w-4/12 lg:gap-10 flex justify-center items-start">
            <div className="w-1/2 sm:w-4/12">
              <h1 className="text-base flex lg:text-lg justify-start gap-2 items-center my-2 text-indigo-400 font-bold">
                <Square3Stack3DIcon className="w-4 lg:w-5" />
                Menu
              </h1>
              <div className="flex flex-col gap-1">
                {navigations.map((item, idx) => {
                  return (
                    <a
                      key={idx}
                      href={item.path}
                      className="text-sm lg:text-base text-neutral-600 hover:font-semibold"
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="w-1/2 sm:w-4/12">
              <h1 className="text-base flex lg:text-lg justify-start gap-2 items-center my-2 text-indigo-400 font-bold">
                <BellAlertIcon className="w-4 lg:w-5" />
                Others
              </h1>
              <div className="flex flex-col gap-1">
                {metadata.others.map((item, idx) => {
                  return (
                    <a
                      key={idx}
                      href={item.path}
                      className="text-sm lg:text-base text-neutral-600 hover:font-semibold"
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="w-4/12">
              <h1 className="text-base flex lg:text-lg justify-start gap-2 items-center my-2 text-indigo-400 font-bold">
                <CursorArrowRaysIcon className="w-4 lg:w-5" />
                Follow Us
              </h1>
              <div className="flex  gap-2">
                <div className="flex gap-1 justify-start items-center"><img src={whatsappIcon} width={32} alt="" className="bg-indigo-400 rounded-sm" /></div>
                <div className="flex gap-1 justify-start items-center"><img src={instagramIcon} width={32} alt="" className="bg-indigo-400 rounded-sm" /></div>
                <div className="flex gap-1 justify-start items-center"><img src={twitterIcon} width={32} alt="" className="bg-indigo-400 rounded-sm" /></div>
              </div>
            </div>
          </div>
        </div>
        {/*  BOTTOM */}
        <div className="p-3 lg:px-16 flex justify-center md:justify-between items-center">
          <h3 className="font-bold text-indigo-400 text-sm">
            Copyright 2024, All Rights Reserved
          </h3>

          <p className="text-xs text-black-col hidden md:inline">
            Carefully crafted by Dhruv, Naman and Omkar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
