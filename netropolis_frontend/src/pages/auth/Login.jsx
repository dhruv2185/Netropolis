import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, setTokens } from "../../features/slices/authSlice";
import AppLoader from "../../utils/AppLoader";
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../features/slices/usersApiSlice";
import Button from "../../components/globals/Button";
import Title from "../../components/globals/Title";
import navigations from "../../data/navigations.json";
import Header from "../../components/globals/Header";
import { loginRequest, fetchUserProfile } from "../../features/userFunctions";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);

  const [{ isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, tokens } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Login with Google
  const login = useGoogleLogin({
    onSuccess: success,
    onError: (error) => {
      console.log('Login Failed:', error)
      toast.error("Login Failed");
    },
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
  });

  const success = async (codeResponse) => {
    try {
      const newTokens = {
        ...tokens,
        access_google: codeResponse.access_token,
      };
      console.log("newTokens", newTokens);
      dispatch(setTokens({ ...newTokens }));

      // fetch user profile stored in google
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
          Accept: 'application/json'
        }
      }
      )
      if (!res.ok) {
        throw Error('Failed to get user profile')
      }
      const data = await res.json();
      console.log(data);

      const username = data.email.split('@')[0];
      const pwd = data.sub + "@" + username;

      // logging In with username and password obtained from google
      const currTokens = await loginRequest({ username, password: pwd });
      if (currTokens.error?.message) {
        throw new Error(currTokens.error.message)
      }
      const userTokens = { ...currTokens, access_google: codeResponse.access_token };
      const user = await fetchUserProfile(userTokens);
      if (user.error?.message) {
        throw new Error(user.error.message)
      }
      dispatch(setTokens(userTokens));
      dispatch(setCredentials({ ...user }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error?.message);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error("All fields are required");
    }
    try {
      const tokens = await loginRequest({ username, password });
      if (tokens.error?.message) {
        throw new Error(tokens.error.message)
      }
      const user = await fetchUserProfile(tokens);
      if (user.error?.message) {
        throw new Error(user.error.message)
      }
      else {
        dispatch(setTokens({ ...tokens }));
        dispatch(setCredentials({ ...user }));
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error?.message);
    }
  };

  return (
    <>
      <Header navigations={navigations} ></Header>
      <div className="relative xs:flex justify-center items-center flex-1 w-full bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/3422583.jpg")', position: 'relative' }}>
        <div className="flex h-screen bg-transparent">

          <div className="w-full flex justify-center items-center bg-transparent">
            <div className="max-w-lg p-5 bg-transparent">
              <div className="text-center mb-10">
                <Title title="Welcome Again" subtitle={"Unlock amazing travel experiences"} titleClass={"text-[#faebd7]"} subtitleClass={"text-[#faebd7]"} />

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
                  className="w-full rounded-full placeholder-[var(--primary)] mb-5 border border-[#94a3b8] px-[12px] py-[8px]"
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
                    className="w-full rounded-full placeholder-[var(--primary)] border border-[#94a3b8] px-[12px] py-[8px] pr-[40px]"
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
                <div className="justify-center w-full pt-2 pb-3 flex gap-4 flex-col text-center items-center">
                  <button
                    className={`w-full text-base lg:text-lg text-white bg-indigo-400 font-bold py-2 px-4 rounded-full`}
                    disabled={isLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      login();
                    }}
                  > Sign In with Google
                  </button>
                </div>
              </form>

              <p className="font-medium text-sm text-center mt-5 text-[white]">
                Already have an account?{" "}
                <Link to="/register" className="text-indigo-400">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
