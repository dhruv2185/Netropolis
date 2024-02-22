import {
  BookmarkIcon,
  MinusCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../globals/Button";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const TeamArticle = ({ teams }) => {
  console.log(teams)
  // const [teams, setTeams] = useState([]);
  // if (Array.isArray(teamsData)) {
  //   setTeams(teamsData);
  // } else {
  //   setTeams([teamsData]);
  // }
  console.log(teams);
  // console.log(typeof teams);

  return (
    <article className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col gap-16 lg:gap-0  items-center max-w-8xl">
        {/* Teams */}
        {/* Articles */}
        <Button text="Create Team" path={"/team-registration"} />
        {teams && <div className="lg:w-2/3 w-full lg:border-r flex justify-start items-center lg:items-start px-8 flex-col">
          {teams.map((team, idx) => (
            <TeamCard key={idx} team={team} />
          ))}
        </div>}
      </div>
    </article>
  );
};


const TeamCard = ({ team }) => {
  const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;
  const tokens = useSelector((state) => state.auth.tokens);
  const removeFields = async (e, index) => {
    e.preventDefault();
    //yaha fetch likhna hai tema remove karne ke liye
    try {
      console.log("try hua");
      const res = await fetch(`${baseUrl}/teams/?pk=${team.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokens.access}`
        }
      })
      if (res.ok) {
        toast.success("Team deleted successfully");
      }
      else {
        const e = await res.json();
        console.log(e);
        throw Error("Failed to delete team. Please try again later.")
      }
    }
    catch (err) {
      toast.error(err.message);
    }
    console.log("removeFields", index);
  }
  return (
    <article className="w-full flex flex-col justify-center items-center border-b py-8">
      <header className="w-full gap-2 flex justify-start items-center">
        <h1 className="text-lg lg:text-xl font-bold mt-2 text-indigo-400 py-5">{team.team_name}</h1>
      </header>
      <main className="flex w-full gap-3 lg:gap-5 justify-stretch items-center">
        <div className="flex-1 h-full gap-1 flex flex-col justify-start items-center">
          <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
            <strong>Composition: </strong>{team.composition}
          </p>
          <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
            <strong>Expectations: </strong>{team.expectations}
          </p>
          <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
            <strong>Concerns: </strong>{team.concerns}
          </p>
          <p className="w-full text-neutral-600 text-sm lg:text-base leading-5">
            <strong>Team Members:</strong>
          </p>
          <ul className="w-full text-neutral-600 text-sm lg:text-base leading-5 grid gap-2
            grid-cols-3 max-lg:grid-cols-2">
            {team.team_info.map((member, idx) => (<div style={{ border: "1px solid #A6A6A6", borderRadius: "8px" }} className="p-4">
              <div className="w-full flex justify-between">
                <h2 className="text-md font-bold mt-1 text-indigo-400 py-1">Member {idx + 1}</h2>
                <button
                  onClick={(e) => removeFields(e, idx)}
                  className={"text-base lg:text-lg font-bold rounded-full"}
                >
                  <MinusCircleIcon className="h-7 w-7 text-red-500 " />
                </button></div>
              <li key={idx}>
                <strong>Name:</strong> {member.name}<br /> <strong>Age:</strong> {member.age}, <strong>Gender:</strong> {member.gender} <br /><strong>Occupation:</strong> {member.occupation}<br /> <strong>Place of Residence:</strong> {member.place_of_residence}
              </li></div>
            ))}
          </ul>
        </div>
      </main>

    </article>
  );
};

export default TeamArticle;