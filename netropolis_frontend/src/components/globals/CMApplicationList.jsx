import React from "react";
import { BookmarkIcon, MinusCircleIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

const CMApplicationList = ({ applications }) => {
  return (
    <article className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col gap-16 lg:gap-0  items-center max-w-8xl">
        <div className="lg:w-2/3 w-full lg:border-r flex justify-center items-center px-8 flex-col">

          {applications.map((application, idx) => (
            <ApplicationCard key={idx} application={application} />
          ))}
        </div>
      </div>
    </article>
  );
};

const ApplicationCard = ({ application }) => {
  console.log(application);
  return (
    <article className="w-full flex flex-col justify-center items-center border-b py-8">
      <header className="w-full gap-2 flex justify-start items-center">
        <h1 className="text-lg lg:text-xl font-bold mt-2 text-indigo-400">{application.quest_name}</h1>
      </header>
      <main className="flex w-full gap-3 lg:gap-5 justify-stretch items-center">
        <div className="flex-1 h-full gap-1 flex justify-start items-center">
          <div className=" flex flex-col">
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Region:</strong> {application.region}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              {/* <strong>Genre Tags:</strong> {application.genre_tags?.join(", ")} */}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Description:</strong> {application.description}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Rewards:</strong> ${application.rewards}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Other Information:</strong> {application.other_information}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Available Till:</strong> {application.available_till}
            </p>
          </div><div className=" flex flex-col">
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Duration of Stay:</strong> From {application.stay_start_date} To {application.stay_end_date}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Special Note:</strong> {application.special_note}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              {/* <strong>Desired Tasks:</strong> {application.desired_tasks.join(", ")} */}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Preferred daily time span for quests during the stay:</strong> {application.daily_time_span}
            </p>
            <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              <strong>Team:</strong> {application.team_name}
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full mt-2 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2 font-bold">
          <h4 className="text-md text-indigo-400">STATUS : </h4><h4 className="text-neutral-600"> {application.status}</h4>
        </div>
        <Button text="Schedule" path="/schedulequest" customClass={"mx-4"} />
      </footer>
    </article>
  );
};

export default CMApplicationList;
