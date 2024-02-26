import {
  CalendarDaysIcon,
  EyeIcon,
  HandThumbUpIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import React, { useState } from 'react';

import Button from "./Button";

const Article = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(filteredData.length / itemsPerPage)) return;
    setCurrentPage(pageNumber);
  };

  const getData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <article className="w-full flex justify-center items-center">
      <div className="w-full flex py-10 gap-16 lg:gap-0 lg:py-20 lg:flex-row-reverse lg:items-start max-w-7xl flex-col">
        {/*categories*/}

        {/*  article*/}
        <div className="w-full lg:w-1/3">
          {/* <RecommendedTopic categories={categories} /> */}
          <Filters selectedTags={selectedTags} setSelectedTags={setSelectedTags} allData={data} setFilteredData={setFilteredData} />
        </div>
        <SearchResults data={getData} totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange} selectedTags={selectedTags} setSelectedTags={setSelectedTags} setFilteredData={setFilteredData} allData={filteredData} />

      </div>

    </article>
  );
};

const SearchResults = ({ data, totalItems, itemsPerPage, currentPage, onPageChange, selectedTags, setSelectedTags, setFilteredData, allData }) => {
  return (
    <div className="lg:w-2/3 w-full lg:border-r flex justify-start items-center lg:items-start px-8 flex-col">
      <h1 className="text-indigo-400 font-bold text-lg xl:text-xl">Results ({totalItems})</h1>
      <div className="w-full">
        {data.map((item, idx) => {
          return <ArticleCard key={idx} data={item} selectedTags={selectedTags} setSelectedTags={setSelectedTags} setFilteredData={setFilteredData} allData={allData} />;
        })}
      </div>

      {totalItems >= itemsPerPage && <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange} />}
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

const ArticleCard = ({ data, selectedTags, setSelectedTags, setFilteredData, allData }) => {
  // console.log(data);
  const handleTagClick = (tag) => {
    let newSelectedTags = [...selectedTags];
    if (newSelectedTags.includes(tag)) {
      return;
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
    console.log(newSelectedTags, allData)
    setFilteredData(allData.filter(item => newSelectedTags.every(t => item.genre_tags.includes(t))));
  };
  const randomIndex = Math.floor(Math.random() * data.quest_name.split(" ").length);
  const unsplash = data.quest_name.split(" ")[randomIndex];
  // console.log(unsplash);
  const u = `https://source.unsplash.com/random/1920x1080/?${unsplash}`
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
        <div className="flex justify-center items-center gap-2 max-w-[60%]">
          {data?.genre_tags?.map((item, idx) => (
            <button
              onClick={() => handleTagClick(item)}
              key={idx}
              className="bg-neutral-200 hover:bg-indigo-400 text-sm hover:text-white text-neutral-600 py-1 px-3 rounded-full"
            >
              {item}
            </button>
          ))}


        </div>
        <div className="flex justify-center items-center gap-2 lg:flex-row flex-col">
          <div className="flex justify-center items-center"><div className="flex justify-center items-center gap-1 mx-2">
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
            </div></div>
          <Button text="Apply" path={`/application/${data.id}`} data={data} customClass={"mx-4"} />
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

const Filters = ({ selectedTags, setSelectedTags, allData, setFilteredData }) => {
  const [sort, setSort] = useState({
    field: '',
    order: '',
  });

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    setSort(prevSort => ({ ...prevSort, [name]: value }));
  };

  const applySorting = () => {
    let newData = [...allData];

    // Apply sorting by date
    if (sort.field === 'date') {
      newData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    // Apply sorting by title
    if (sort.field === 'title') {
      newData.sort((a, b) => a.quest_name.localeCompare(b.quest_name));
    }

    // Reverse order if needed
    if (sort.order === 'desc') {
      newData.reverse();
    }

    // Update filtered data
    setFilteredData(newData);
  };
  const removeTag = (e, tag) => {
    e.preventDefault();
    const updatedTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(updatedTags);
    setFilteredData(allData.filter(item => updatedTags.every(t => item.genre_tags.includes(t))));
  };

  return (
    <div className="w-full p-8 gap-4 lg:flex flex-col justify-center items-center">
      <h1 className="w-full text-indigo-400 font-bold text-xl">Filters</h1>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="flex">
          {selectedTags.length > 0 && selectedTags.map((tag, index) => {
            return (
              <span key={index} className="inline-flex justify-center items-center ml-4 rounded-full bg-indigo-400 p-1 px-2 tracking-wide m-1">
                <p className="text-white font-inter">{tag}</p>
                <button
                  onClick={(e) => removeTag(e, tag)}
                  className={"text-base lg:text-lg font-bold rounded-full"}
                >
                  <XMarkIcon className="h-5 w-5 text-white " />
                </button>
              </span>
            );
          })}
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-2">
          <select
            name="field"
            value={sort.field}
            onChange={handleSortChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Sort by...</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
          <select
            name="order"
            value={sort.order}
            onChange={handleSortChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Order...</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full" onClick={applySorting}>
            Apply
          </button>
        </div>

      </div>
    </div>
  );
};

export default Article;
