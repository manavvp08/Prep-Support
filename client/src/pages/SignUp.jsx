import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cookies from "universal-cookie";
import RingLoader from "react-spinners/RingLoader";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [validResponse, setValidResponse] = useState(true);
  const [loading, setLoading] = useState(false);
  const [Userotp, setUserotp] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const signupRef = useRef(null);
  const otpRef = useRef(null);
  const [newEmail, setNewEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("@gmail.com");

  useEffect(() => {
    otpRef.current.style.display = "none";
  }, []);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setNewEmail(value.trim() + emailDomain);
  };
  const handleUidChange = (e) => {
    const enteredUid = e.trim();
    const isValidUid = enteredUid.length === 10;

    if (isValidUid) {
      setUniversityId(enteredUid);
      return true;
    } else {
      setValidResponse(false);
      return false;
    }
  };
  const handleSignUpDb = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValidEmail = true;
    if (!isValidEmail) {
      toast.error("Please enter the chitkara email", {
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
    const isValidUid = handleUidChange(universityId);
    if (!isValidUid) {
      toast.error("Please enter the valid Id", {
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

    if (isValidEmail && isValidUid) {
      const obj = {
        name: name,
        email: newEmail,
        password: password,
        uid: parseInt(universityId),
        otp: Userotp,
      };

      let res = await fetch(`${import.meta.env.VITE_SERVER}/signup`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      });
      res = await res.json();
      cookies.set("token", res.token);
      cookies.set("isAdmin", false);

      cookies.set("email", newEmail);
      cookies.set("name", name);
      cookies.set("uid", universityId);

      if (res.success) {
        toast.success(res.message, {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        otpRef.current.style.display = "block";
        signupRef.current.style.display = "none";
        setTimeout(() => {
          navigate("/home");
          window.location.reload();
        }, 1010);
      } else {
        toast.error(res.message, {
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
    }
    setLoading(false);
  };
  const changeDisplay = async () => {
    setLoading(true);
    const isValidEmail = true;
    if (!isValidEmail) {
      toast.error("Please enter the chitkara email", {
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
    const isValidUid = handleUidChange(universityId);
    if (!isValidUid) {
      toast.error("Please enter the valid Id", {
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

    if (isValidEmail && isValidUid) {
      let res = await fetch(`${import.meta.env.VITE_SERVER}/verifyEmail`, {
        method: "POST",
        body: JSON.stringify({
          email: newEmail,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      res = await res.json();
      if (res.success) {
        otpRef.current.style.display = "block";
        signupRef.current.style.display = "none";
      } else {
        toast.error(res.message, {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    setLoading(false);
  };
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
      <Navbar />
      {loading && (
        <div className="w-full h-full absolute flex justify-center items-center z-50 bg-opacity-25 bg-slate-700">
          <RingLoader
            color={"blue"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className="relative h-screen flex items-center p-8 mt-8 justify-center bg-gray-100 overflow-hidden">
        {/* Render Circles */}
        {circleStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute w-[100px] h-[100px] bg-${style.backgroundColor}-500 rounded-full`}
            style={{ ...style, transform: "translate(-50%, -50%)" }}
          ></div>
        ))}

        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md mt-1">
          <div className="text-center mb-8">
            <div className="text-2xl text-indigo-800 font-semibold">
              Sign Up for a New Account
            </div>
            <p className="text-gray-500 mt-3">
              Create an account to access additional features.
            </p>
          </div>
          <form onSubmit={handleSignUpDb} method="POST">
            <div ref={signupRef}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700"
                >
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700"
                >
                  Email Address*
                </label>
                <div className="flex justify-between items-center flex-wrap">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="w-1/2 mt-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <select
                    className=" w-1/2 h-11 mt-2 text-lg border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                  >
                    <option value="@gmail.com">
                      @gmail.com
                    </option>
                    {/* <option value="gmail.com">gmail.com</option>
                    <option value="yahoo.com">yahoo.com</option>
                    <option value="outlook.com">outlook.com</option> */}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700"
                >
                  Password*
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="universityId"
                  className="block text-sm font-bold text-gray-700"
                >
                  University ID*
                </label>
                <input
                  id="universityId"
                  name="universityId"
                  type="text"
                  className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="211*******"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-8">
                <button
                  className="bg-indigo-500 text-gray-100 p-3 w-full rounded-md tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600"
                  type="button"
                  onClick={changeDisplay}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div ref={otpRef}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-bold text-gray-700"
                >
                  OTP*
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter OTP"
                  value={Userotp}
                  onChange={(e) => setUserotp(e.target.value)}
                  required
                />
              </div>
              <div className="mb-8">
                <button
                  className="bg-indigo-500 text-gray-100 p-3 w-full rounded-md tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600"
                  type="submit"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>
          <div className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
              Log in here
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
