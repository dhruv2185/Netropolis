import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const AppLoader = () => {
  return (
    <div className='flex justify-center'>
      <AiOutlineLoading3Quarters className={`animate-spin text-4xl text-indigo-400`} />
    </div>
  );
};

export default AppLoader;
