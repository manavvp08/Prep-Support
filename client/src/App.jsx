import "./App.css";
import RingLoader from "react-spinners/RingLoader";
import Admin from "./pages/Admin";
import { Route, Routes, Navigate } from "react-router-dom";
import Submitted from "./pages/Submitted";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Form from "./pages/Form";
import BlogPost from "./components/BlogPost";
import Questions from "./pages/Questions";
import InterviewForm from "./pages/InterviewForm";
import Error404 from "./pages/Error404";
import LandingPage from "./components/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import Cookies from "universal-cookie";
import Addadmin from "./pages/Addadmin";
import Profile from "./pages/Profile";
import "./styles/animateText.css";
import { decodeToken, isExpired } from "react-jwt";
import ContactList from "./components/ContactList";

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  useEffect(() => {
    const connectingToServer = async () => {
      setLoading(true);
      let res = await fetch(`${import.meta.env.VITE_SERVER}`);
      if (res.status === 200) {
        setLoading(false);
      }
    };
    connectingToServer();
  }, []);
  useEffect(() => {
    const validate = cookies.get("token");
    const decoded = decodeToken(validate);
    const expired = isExpired(validate);
    if (!expired) {
      setIsAuth(validate);
      if (decoded.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, [isAuth, isAdmin]);

  return (
    <>
      {loading && (
        <div className="w-full h-full absolute flex justify-center items-center z-50 bg-opacity-90 bg-slate-700 flex-col">
          <span className="font-bold text-4xl mb-3 bg-gradient-to-r from-black to-white text-transparent bg-clip-text animate-gradient flex justify-center items-center text-center">
            please wait to start the server....
          </span>
          <RingLoader
            color={"blue"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuth == null ? <LandingPage /> : isAdmin ? <Admin /> : <Home />
          }
        />
        <Route
          path="/home"
          element={isAuth == null ? <Login /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/login"
          element={isAuth == null ? <Login /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/signup"
          element={isAuth == null ? <SignUp /> : isAdmin ? <Admin /> : <Home />}
        />
        <Route
          path="/admin"
          element={isAuth && isAdmin ? <Admin /> : <Login />}
        />
        <Route
          path="/add-admin"
          element={isAuth && isAdmin ? <Addadmin /> : <Login />}
        />
        <Route
          path="/contact-list"
          element={
            isAuth && isAdmin ? (
              <ContactList isAdmin={isAdmin} isAuth={isAuth} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/formSubmitted"
          element={isAuth == null ? <LandingPage /> : <Submitted />}
        />
        <Route
          path="/form"
          element={isAuth ? <Form /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/questions"
          element={isAuth ? <Questions /> : <Navigate to="/login" />}
        />
        <Route
          path="/post/:id"
          element={isAuth ? <BlogPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            isAuth ? (
              <Profile isAuth={isAuth} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Contact"
          element={
            isAuth ? (
              <Contact isAdmin={isAdmin} isAuth={isAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
