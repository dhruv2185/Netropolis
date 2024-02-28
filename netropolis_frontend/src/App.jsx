import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserProfile } from "./features/userFunctions";
import { clearCredentials, clearTokens } from "./features/slices/authSlice";
const App = () => {
  const { userInfo, tokens } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUserProfileData = async () => {
    const data = await fetchUserProfile(tokens);
    if (data.error?.statusCode === 401) {
      dispatch(clearCredentials());
      dispatch(clearTokens());
      toast.error("Please login to continue.");
      navigate("/");
    }
  };
  useEffect(() => {
    if (userInfo === null) {
      navigate("/");
    }
    else {
      fetchUserProfileData();


    }
  }, [navigate, userInfo]);
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default App;
