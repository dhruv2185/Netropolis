import { Link } from "react-router-dom";

const Button = ({ text, path, customClass, loading, data }) => {
  return (
    <button
      className={`${customClass} text-base lg:text-lg text-white bg-indigo-400 font-bold w-auto py-2 px-4 rounded-full`}
      disabled={loading}

    >
      <Link to={path} state={data ? data : {}} >{text}</Link>
    </button>
  );
};

export default Button;
