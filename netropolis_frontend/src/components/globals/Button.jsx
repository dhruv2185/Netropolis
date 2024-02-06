import { Link } from "react-router-dom";

const Button = ({ text, path, customClass,loading }) => {
  return (
    <button
      className={`${customClass} text-base lg:text-lg text-white bg-indigo-400 font-bold w-auto py-2 px-4 rounded-full`}
      disabled={loading}
      
    >
      <Link to={path}>{text}</Link>
    </button>
  );
};

export default Button;
