import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "universal-cookie";
import RingLoader from "react-spinners/RingLoader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const [loading, setLoading] = useState(false);
  const [Userotp, setUserotp] = useState("");
  const [generateOtp, setGenerateOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const mainRef = useRef(null);
  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const passRef = useRef(null);
  const [newEmail, setNewEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("@gmail.com");

  useEffect(() => {
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    otpRef.current.style.display = "none";
    passRef.current.style.display = "none";
  }, []);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setNewEmail(value.trim() + emailDomain);
  };
  const handleSignUpDb = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await axios.post(
        `${import.meta.env.VITE_SERVER}/getUserDetails`,
        {
          method: "POST",
          body: { email: newEmail },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (user.data.success) {
        const userDetail = user.data.data;
        cookies.set("email", userDetail.email);
        cookies.set("name", userDetail.name);
        cookies.set("uid", userDetail.uid);
        cookies.set("userImage", userDetail.image);

        let response = await fetch(`${import.meta.env.VITE_SERVER}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: newEmail, password }),
        });
        response = await response.json();

        if (response.success) {
          if (response.isAdmin === true) {
            cookies.set("token", response.token);
            cookies.set("isAdmin", response.isAdmin);
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
                window.location.reload();
              }, 1000);
            } else {
              toast.error(response.message, {
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
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
          } else {
            cookies.set("token", response.token);
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
                navigate("/home");
                // window.location.reload();
              }, 1000);
            } else {
              toast.error(response.message, {
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
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
          }
        } else {
          toast.error(response.message, {
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
      } else {
        toast.error(user.data.message, {
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
    } catch (error) {
      toast.error(error, {
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
  const handleForgetPass = async (e) => {
    setLoading(true);
    mainRef.current.style.display = "none";
    emailRef.current.style.display = "block";
    otpRef.current.style.display = "none";
    passRef.current.style.display = "none";
    setLoading(false);
  };
  const handleVerifyOtp = async (e) => {
    setLoading(true);
    let res = await fetch(`${import.meta.env.VITE_SERVER}/compareotp`, {
      method: "POST",
      body: JSON.stringify({
        otp: Userotp,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    if (res.success) {
      toast.success("OTP Verified", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      mainRef.current.style.display = "none";
      emailRef.current.style.display = "none";
      otpRef.current.style.display = "none";
      passRef.current.style.display = "block";
      setLoading(false);
    } else {
      toast.error("Invalid OTP", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      mainRef.current.style.display = "none";
      emailRef.current.style.display = "none";
      otpRef.current.style.display = "block";
      passRef.current.style.display = "none";
      setLoading(false);
    }
  };
  const handleNewPass = async (e) => {
    setLoading(true);
    let res = await fetch(`${import.meta.env.VITE_SERVER}/changePassword`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: newPass,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
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
      navigate("/home");
      window.location.reload();
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
    setLoading(false);
  };
  const checkUserExist = async () => {
    setLoading(true);
    let res = await fetch(`${import.meta.env.VITE_SERVER}/checkUserExists`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    if (res.success) {
      await fetch(`${import.meta.env.VITE_SERVER}/verifyEmail`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
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
      mainRef.current.style.display = "none";
      emailRef.current.style.display = "none";
      otpRef.current.style.display = "block";
      passRef.current.style.display = "none";
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
    setLoading(false);
  };
  const emailRefBack = async () => {
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    otpRef.current.style.display = "none";
    passRef.current.style.display = "none";
  };
  const otpRefBack = async () => {
    mainRef.current.style.display = "none";
    emailRef.current.style.display = "block";
    otpRef.current.style.display = "none";
    passRef.current.style.display = "none";
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1000}
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
      <div className="relative h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Random Circles */}
        {circleStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute w-[100px] h-[100px] bg-${style.backgroundColor}-500 rounded-full`}
            style={{ ...style, transform: "translate(-50%, -50%)" }}
          ></div>
        ))}

        {/* Form Card */}
        <div
          className="relative z-10 bg-white p-8 rounded-lg  shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px]"
          ref={mainRef}
        >
          <div className="text-center mb-8">
            <div className="text-2xl text-indigo-800 tracking-wide font-semibold">
              Login to your Account
            </div>
            <p className="text-gray-500 mt-3">Log Into Your Account.</p>
          </div>
          <form onSubmit={handleSignUpDb}>
            <div className="flex flex-wrap">
              <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                Email Address
              </div>
              <div className="flex justify-between items-center">
                <input
                  className="w-1/2 text-lg border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <select
                  className=" w-1/2 text-lg border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                >
                  <option value="gmail.com">
                    @gmail.com
                  </option>
                  {/* <option value="gmail.com">@gmail.com</option>
                  <option value="yahoo.com">@yahoo.com</option>
                  <option value="outlook.com">@outlook.com</option> */}
                </select>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                  Password
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                onClick={() => handleForgetPass()}
                className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer text-end w-full"
                type="button"
              >
                Forgot Password?
              </button>
            </div>
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-sm text-gray-600 text-center mt-8">
            Don't have an Account?
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Sign up here
            </Link>
          </div>
        </div>
        <div
          ref={emailRef}
          className="relative z-10 bg-white p-8 rounded-lg  shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px]"
        >
          <div className="font-bold flex mb-7">
            <button
              className="bg-indigo-500 text-gray-100 p-2 rounded tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              onClick={() => emailRefBack()}
            >
              Back
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-bold text-gray-700"
            >
              Email Address*
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <button
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              type="button"
              onClick={() => checkUserExist()}
            >
              Send OTP
            </button>
          </div>
        </div>
        <div
          ref={otpRef}
          className="relative z-10 bg-white p-8 rounded-lg  shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px]"
        >
          <div className="font-bold flex mb-7">
            <button
              className="bg-indigo-500 text-gray-100 p-2 rounded tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              onClick={() => otpRefBack()}
            >
              Back
            </button>
          </div>
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
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              type="button"
              onClick={() => handleVerifyOtp()}
            >
              Verify
            </button>
          </div>
        </div>
        <div
          ref={passRef}
          className="relative z-10 bg-white p-8 rounded-lg  shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px]"
        >
          {/* <div className="font-bold flex mb-7">
            <button className="bg-indigo-500 text-gray-100 p-2 rounded tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
              Back
            </button>
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="newPass"
              className="block text-sm font-bold text-gray-700"
            >
              New Password*
            </label>
            <input
              id="newPass"
              name="newPass"
              type="text"
              className="mt-1 p-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <button
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              type="button"
              onClick={() => handleNewPass()}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
