import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/slice/userSlice";

function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await fetchUserDetails();
        dispatch(setUserDetails(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    restoreUser();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
