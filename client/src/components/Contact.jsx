import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const Contact = ({ isAuth, isAdmin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  const [validResponse, setValidResponse] = useState(true);

  const handleEmailChange = (e) => {
    const enteredEmail = e.trim();
    const isValidEmail = enteredEmail.endsWith("@chitkarauniversity.edu.in");

    if (isValidEmail) {
      setEmail(enteredEmail);
      return true;
    } else {
      setValidResponse(false);
      return false;
    }
  };
  const handleUidChange = (e) => {
    const enteredUid = e.trim();
    const isValidUid = enteredUid.length === 10;

    if (isValidUid) {
      setUid(enteredUid);
      return true;
    } else {
      setValidResponse(false);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = handleEmailChange(email);
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
    const isValidUid = handleUidChange(uid);
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
        email: email,
        uid: parseInt(uid),
        message: message,
      };

      // console.log(obj);
      const response = await fetch(`${import.meta.env.VITE_SERVER}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();

      if (data.status === 201) {
        toast.success(data.message, {
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
          //   window.location.reload();
        }, 1000);
      } else {
        toast.error(data.message, {
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
      setName("");
      setEmail("");
      setMessage("");
      setUid("");
    }
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
      {isAuth && isAdmin ? <AdminNavbar /> : <Navbar />}

      <div className="mt-4 ml-5 mr-5">
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
            <div className="lg:w-1/2 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                frameBorder="0"
                title="map"
                marginHeight="0"
                marginWidth="0"
                scrolling="no"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15083.933850650454!2d72.8358602!3d19.0644647!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130392c07%3A0x3c47bf391c8de931!2sThadomal%20Shahani%20Engineering%20College!5e0!3m2!1sen!2sin!4v1717763307559!5m2!1sen!2sin"
              ></iframe>
              <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                <div className="lg:w-1/2 px-6">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                    ADDRESS
                  </h2>
                  <p className="mt-1">
                  W, P. G. Kher Marg, 32nd Road, Marg, Off Linking Rd, TPS III, 
                  Bandra West, Mumbai, Maharashtra 400050
                  
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font mx-auto">
                Contact Us
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600">
                Feel free to contact us for any queries, We are here to help
                you.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="uid"
                    className="leading-7 text-sm text-gray-600"
                  >
                    University Id
                  </label>
                  <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
