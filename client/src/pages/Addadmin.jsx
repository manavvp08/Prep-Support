import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
function Addadmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  //   const handleLogin = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const q = query(collection(db, "admin"), where("email", "==", email));

  //       const querySnapshot = await getDocs(q);

  //       if (querySnapshot.empty) {
  //         toast.error("Invalid email or password");
  //         return;
  //       }

  //       querySnapshot.forEach((doc) => {
  //         if (doc.data().password === password) {
  //           navigate("/admin");
  //         } else {
  //           toast.error("Invalid email or password");
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error signing in: ", error);
  //       toast.error("Error signing in");
  //     }
  //   };
  const handleSignInDb = async (e) => {
    e.preventDefault();

    // const obj = {
    //   email: email,
    //   password: password,
    // };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const response = await axios.put(
    //   `${import.meta.env.VITE_SERVER}/add-admin`,
    //   { email },
    //   config
    // );
    let response = await fetch(`${import.meta.env.VITE_SERVER}/add-admin`, {
      method: "PUT",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (response.success) {
      toast.success(response.message, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/admin");
        // window.location.reload();
      }, 1010);
    } else {
      toast.error(response.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Random positions for circles
  const circleStyles = [
    { top: "10%", left: "15%", backgroundColor: "indigo" },

    {
      top: "100%",
      left: "80%",
      backgroundColor: "blue",
      transform: "translate(-50%, -100%)",
    },
  ];

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <AdminNavbar />
      <div className="relative h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Random Circles */}
        {circleStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute w-[100px] h-[100px] bg-${style.backgroundColor}-00 rounded-full`}
            style={{ ...style, transform: "translate(-50%, -50%)" }}
          ></div>
        ))}

        {/* Form Card */}
        <div className="relative z-10 bg-white p-8 rounded-lg  shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px]">
          <div className="text-center mb-8">
            <div className="text-2xl text-indigo-800 tracking-wide font-semibold">
              Make Admin
            </div>
            <p className="text-gray-500 mt-3">Admin proceed.</p>
          </div>
          <form onSubmit={handleSignInDb} method="POST">
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                Email Address
              </div>
              <input
                className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                {/* <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                  Password
                </div> */}
                <div>
                  {/* <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Forgot Password?
                  </a> */}
                </div>
              </div>
              {/* <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
            </div>
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                type="submit"
              >
                Make Admin
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Addadmin;
