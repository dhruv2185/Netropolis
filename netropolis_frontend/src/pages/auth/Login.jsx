import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/slices/authSlice";
import AppLoader from "../../utils/AppLoader";
import { validateEmail } from "../../utils/validateEmail";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../features/slices/usersApiSlice";
import Button from "../../components/globals/Button";
import Title from "../../components/globals/Title";
const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error("All fields are required");
    }
    

    try {
      const res = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error?.message);
    }
  };

  return (
    <div className="relative xs:flex justify-center items-center flex-1 w-full bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp9422433.jpg")', position: 'relative' }}>
      <div className="flex h-screen bg-transparent">
        {/* Left side */}
        {/* Right side */}
        <div className="w-full flex justify-center items-center bg-transparent">
          <div className="max-w-lg p-5 bg-transparent">
            <div className="text-center mb-10">
              <Title title="Welcome Again" subtitle={"Unlock amazing travel experiences"} titleClass={"text-[#faebd7]"} subtitleClass={"text-[#faebd7]"}/>
              
            </div>
            <form onSubmit={submitHandler}>
              <label
                htmlFor="email"
                className="text-[14px] font-inter text-indigo-400   "
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
                required
                className="w-full rounded-lg placeholder-[var(--primary)] mb-5 border border-[#94a3b8] px-[12px] py-[8px]"
              />
              
              <label
                htmlFor="password"
                className="text-[14px] font-inter text-indigo-400 mt-10"
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  value={password}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  required
                  className="w-full rounded-lg placeholder-[var(--primary)] border border-[#94a3b8] px-[12px] py-[8px] pr-[40px]"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <AiOutlineEye size={25} />
                  ) : (
                    <AiOutlineEyeInvisible size={25} />
                  )}
                </span>
              </div>

              <p className="text-sm text-right mt-3 text-indigo-100 pb-2 mb-3">
                <Link to="/forgotpassword">Forgot Password</Link>
              </p>
              <Button text={isLoading ? <AppLoader /> : "Sign In"} customClass={"w-full"} loading={isLoading} ></Button>
              {/* <button
                type="submit"
                className="bg-[var(--primary)] text-white rounded-lg py-2 px-4 w-full mt-12"
                disabled={isLoading}
              >
                {isLoading ? <AppLoader /> : "Sign In"}
              </button> */}
            </form>

            <p className="font-medium text-sm text-center mt-5 text-[white]">
              Already have an account?{" "}
              <Link to="/register" className="text-indigo-400">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        {/* Glass-like overlay */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="text-center relative z-10">
          <img src='https://mywanderlustbucket.s3.eu-north-1.amazonaws.com/Black_and_Orange_Illustration_Company_Logo__2_-fotor-20240129151630-removebg-preview.png' alt="logo" />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
