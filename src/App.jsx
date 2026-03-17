import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/slice/userSlice";
import summaryApi from "./common/SummaryApi";
import Axios from "./utils/Axios";
import { setAllCategory, setAllSubCategory } from "./store/slice/productSlice";
// import GlobalProvider from "./provider/GlobalProvider";


function App() {
  const dispatch = useDispatch();

  const restoreUser = async () => {
    try {
      const res = await fetchUserDetails();
      dispatch(setUserDetails(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.get_category,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.get_subCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    restoreUser();
    fetchCategory();
    fetchSubCategory();
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
