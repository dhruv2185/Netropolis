import {
    BookmarkIcon,
    MinusCircleIcon,
    EllipsisHorizontalIcon,
  } from "@heroicons/react/24/outline";
  import Button from "./Button";
  
  const TeamArticle = ({ teams }) => {
    return (
      <article className="w-full flex justify-center items-center">
        <div className="w-full flex flex-col py-10 gap-16 lg:gap-0 lg:py-20 lg:flex-row-reverse lg:items-start max-w-7xl">
          {/* Teams */}
          {/* Articles */}
          <div className="lg:w-2/3 w-full lg:border-r flex justify-start items-center lg:items-start px-8 flex-col">
            <h1 className="text-indigo-400 font-bold text-lg xl:text-xl">Teams Details</h1>
            {teams.map((team, idx) => (
              <TeamCard key={idx} team={team} />
            ))}
          </div>
        </div>
      </article>
    );
  };
  
  
  const TeamCard = ({ team }) => {
    return (
      <article className="w-full flex flex-col justify-center items-center border-b py-8">
        <header className="w-full gap-2 flex justify-start items-center">
          <h1 className="text-lg lg:text-xl font-bold mt-2 text-neutral-600">{team.team_name}</h1>
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
            <ul className="w-full text-neutral-600 text-sm lg:text-base leading-5">
              {team.members.map((member, idx) => (
                <li key={idx}>
                  <strong>Name:</strong> {member.name}, <strong>Age:</strong> {member.age}, <strong>Gender:</strong> {member.gender}, <strong>Occupation:</strong> {member.occupation}, <strong>Place of Residence:</strong> {member.residence}
                </li>
              ))}
            </ul>
          </div>
        </main>
        
      </article>
    );
  };
  
  export default TeamArticle;