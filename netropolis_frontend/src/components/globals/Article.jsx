import {
  CalendarDaysIcon,
  BookmarkIcon,
  MinusCircleIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  HandThumbUpIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from 'react';

import Button from "./Button";

const Article = ({ data }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(data.length / itemsPerPage)) return;
    setCurrentPage(pageNumber);
  };

  const getData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <article className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col py-10 gap-16 lg:gap-0 lg:py-20 lg:flex-row-reverse lg:items-start max-w-7xl">
        {/*categories*/}
        <div className="w-full lg:w-1/3">
          <RecommendedTopic categories={categories} />
          <StaffPick data={data} header={window.location.pathname === "/destinations" ? "Destinations Staff Pick" : "Things to Do Staff Pick"} />
        </div>
        {/*  article*/}

        <SearchResults data={getData} totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange} />

      </div>

    </article>
  );
};

const SearchResults = ({ data, totalItems, itemsPerPage, currentPage, onPageChange }) => {
  return (
    <div className="lg:w-2/3 w-full lg:border-r flex justify-start items-center lg:items-start px-8 flex-col">
      <h1 className="text-indigo-400 font-bold text-lg xl:text-xl">Search Results ({data.length})</h1>
      <div className="w-full">
        {data.map((item, idx) => {
          return <ArticleCard key={idx} data={item} />;
        })}
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange} />
    </div>
  );
};

// const RecommendedTopic = ({ categories }) => {
//   return (
//     <div className="flex flex-col justify-center lg:items-start w-full px-8 items-center gap-6">
//       <h1 className="text-indigo-400 font-bold text-lg lg:text-xl">
//         Recommended Topics
//       </h1>
//       <div className="flex flex-wrap max-w-lg justify-center lg:justify-start gap-3 items-center">
//         {categories.map((item, idx) => (
//           <a
//             href={`/`}
//             key={idx}
//             className="bg-neutral-200 hover:bg-indigo-400 hover:text-white text-neutral-600 py-2 px-4 rounded-full"
//           >
//             {item.title}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

const ArticleCard = ({ data }) => {
  // console.log(data);
  const randomIndex = Math.floor(Math.random() * data.quest_name.split(" ").length);
  const unsplash = data.quest_name.split(" ")[randomIndex];
  // console.log(unsplash);
  const u = `https://source.unsplash.com/random/1920x1080/?${unsplash}`
  console.log(u);
  return (
    <article className="w-full flex flex-col justify-center items-center border-b py-8">
      <header className="w-full gap-2 flex justify-start items-center">

        <p className="text-neutral-600 text-sm lg:text-base flex gap-1">
          <MapPinIcon className="w-4 lg:w-5" />
          <span className="font-bold text-indigo-400">
            {data.region}
          </span>
        </p>
        <CalendarDaysIcon className="w-4 lg:w-5" />
        <p className="text-sm lg:text-base text-neutral-600">{(new Date(data.created_at)).toDateString()}</p>
      </header>
      <main className="flex w-full gap-3 lg:gap-5 justify-stretch items-center">
        <div className="flex-1 h-full gap-1 flex flex-col justify-start items-center">
          <h1 className="text-lg lg:text-xl font-bold mt-2 text-neutral-600 cutoff-text cutoff-text-2 w-full">
            {data.quest_name}
          </h1>
          <p className="w-full text-neutral-600 text-sm lg:text-base leading-5 cutoff-text cutoff-text-2">
            {data.description}
          </p>
          {/* {Object.prototype.hasOwnProperty.call(data, "location") ? (
            <div className="w-full flex justify-start my-3 items-center">
              <MapPinIcon className="w-4 text-neutral-600" />
              <span className="text-xs text-neutral-600">{data.location}</span>
            </div>
          ) : (
            ""
          )} */}
        </div>
        <div
          className="w-24 aspect-square rounded-xl bg-cover"
          style={{
            backgroundImage: `url(${u})`,
          }}
        ></div>
      </main>
      <footer className="w-full mt-2 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          {data?.genre_tags?.map((item, idx) => (
            <a
              href={`/`}
              key={idx}
              className="bg-neutral-200 hover:bg-indigo-400 text-sm hover:text-white text-neutral-600 py-1 px-3 rounded-full"
            >
              {item}
            </a>
          ))}


        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-1 mx-2">
            <EyeIcon className="w-5 text-neutral-600 cursor-pointer" />
            <span className="text-neutral-600 lg:text-sm text-xs">
              {Math.floor(Math.random() * 100) + 1}k
            </span>
          </div>
          <div className="flex justify-center items-center gap-1 mx-2">
            <HandThumbUpIcon className="w-5 text-neutral-600 cursor-pointer" />
            <span className="text-neutral-600 lg:text-sm text-xs">
              {Math.floor(Math.random() * 10) + 1}k
            </span>
          </div>
          <BookmarkIcon className="w-5 text-neutral-600 cursor-pointer" />
          <Button text="Apply Now" path={`/application/${data.id}`} data={data} customClass={"mx-4"} />
        </div>
      </footer>
    </article>
  );
};



const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="w-full p-4 flex justify-end gap-5 items-center">
      <div className="flex cursor-pointer gap-2 justify-center items-center" onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeftIcon className="w-4" />
        <span className="text-neutral-600 font-bold text-sm">Prev</span>
      </div>
      <div className="flex justify-center items-center gap-2">
        {pageNumbers.map(number => (
          <div
            key={number}
            className={`text-sm w-6 cursor-pointer aspect-square rounded-full flex justify-center items-center ${number === currentPage ? 'bg-indigo-400 text-white' : 'bg-neutral-200 text-neutral-600'}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="flex cursor-pointer gap-2 justify-center items-center" onClick={() => onPageChange(currentPage + 1)}>
        <span className="text-neutral-600 font-bold text-sm">Next</span>
        <ChevronRightIcon className="w-4" />
      </div>
    </div>
  );
};

const StaffPick = ({ data, header }) => {
  return (
    <div className="w-full p-8 hidden gap-4 lg:flex flex-col justify-center items-center">
      <h1 className="w-full text-indigo-400 font-bold text-xl">{header}</h1>
      <div className="w-full flex flex-col justify-center items-ccenter">
        {
          data.sort((a, b) => a.viewCount - b.viewCount).slice(0, 5).map((item, idx) => {
            return (
              <a href={`/destinations/${item.slug}`} className="w-full hover:bg-indigo-400 hover:color-white rounded-lg flex border-b p-4 justify-between items-center">
                <h1 className="text-neutral-600">{item.title}</h1>
                <div className="flex justify-center items-center gap-2">
                  <BookmarkIcon className="w-5 text-neutral-600 cursor-pointer" />
                  <MinusCircleIcon className="w-5 text-neutral-600 cursor-pointer" />
                  <EllipsisHorizontalIcon className="w-5 text-neutral-600 cursor-pointer" />
                </div>
              </a>
            )
          })
        }
      </div>
    </div>
  )
}

export default Article;
