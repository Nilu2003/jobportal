import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import API from "./api/api.js";
import { loginSuccess, logout } from "./features/auth/authSlice.js";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/getprofile");

        if (res?.data?.data) {
          dispatch(loginSuccess(res.data.data));
        }
      } catch (error) {
        // console.log("User not logged in"); 
        dispatch(logout());
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    fetchUser();
  }, [dispatch]);

    if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;