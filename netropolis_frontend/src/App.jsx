import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserProfile } from "./features/userFunctions";
import { clearCredentials, clearTokens } from "./features/slices/authSlice";
const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo === null) {
      navigate("/");
    }
    else {
      const data = fetchUserProfile(userInfo);
      if (data.statusCode === 401) {
        dispatch(clearCredentials());
        dispatch(clearTokens());
        toast.error("Please login to continue.");
        navigate("/");
      }
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
