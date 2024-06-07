import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";
import image from "../assets/image.png";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import Cookies from "universal-cookie";

const Profile = ({ isAuth, isAdmin }) => {
  const [name, setName] = useState("");
  const mainRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const expref = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [editname, setEditName] = useState(name);
  const [sessionEmail, setSessionEmail] = useState("");
  const editImageRef = useRef();
  const imageRef = useRef();
  const [ProfileImage, setProfileImage] = useState("");
  const [exp, setExp] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [approvedTechQuestions, setApprovedTechQuestions] = useState([]);
  // const [approvedHRQuestions, setApprovedHRQuestions] = useState([]);
  const [profileImageSrc, setProfileImageSrc] = useState([]);
  const cookies = new Cookies();

  const handleDeleteQuestion = (questionIndex, questionType) => {
    const updatedQuestions = [...selectedPost[`${questionType}Questions`]];
    updatedQuestions.splice(questionIndex, 1);
    setSelectedPost({
      ...selectedPost,
      [`${questionType}Questions`]: updatedQuestions,
    });
  };
  const editFromUser = (post) => {
    setSelectedPost(post);
    setEditMode(true);
    document.getElementById("editModal1").showModal();
  };
  const editFieldSave = async (id) => {
    try {
      handleCloseModal1();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER}/update-user-exp?id=${id}`,
        { selectedPost },
        config
      );
      if (res.data.success) {
        fetchExp();
        toast.success("Updated succesfully");
      }
    } catch (error) {
      console.log("Error" + error);
      toast.error("Something went wrong");
    }
  };
  const fetchExp = async () => {
    const email = cookies.get("email");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/get-exp`,
        { email },
        config
      );
      setExp(res.data.data);
    } catch (error) {
      console.log("Error from " + error);
    }
  };
  useEffect(() => {
    const name = cookies.get("name");
    const email = cookies.get("email");
    name == undefined || null ? "" : setName(name);
    email == undefined || null ? "" : setSessionEmail(name), setEmail(email);
    setName(name);
    setSessionEmail(email);
    fetchExp();
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    passRef.current.style.display = "none";
    editImageRef.current.style.display = "none";
    expref.current.style.display = "none";

    const setImage = async () => {
      let user = await axios.post(
        `${import.meta.env.VITE_SERVER}/getUserDetails`,
        {
          method: "POST",
          body: { email: email },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (user.data.success) {
        const imagePath = user.data.data.image;
        if (imagePath) {
          let imageUrl = await fetch(
            `${import.meta.env.VITE_SERVER}/send-profile-image/${imagePath}`
          );
          imageUrl = await imageUrl.json();

          imageRef.current.src = "data:image/jpg;base64," + imageUrl.imagePath;
          setProfileImage("data:image/jpg;base64," + imageUrl.imagePath);
        }
      }
    };
    setImage();
  }, []);

  const editProfile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", email);

      // console.log(formData);
      let res = await fetch(`${import.meta.env.VITE_SERVER}/profile-image`, {
        method: "POST",
        body: formData,
      });
      res = await res.json();
      if (res) {
        const imagePath = res.imagePath;
        let imageUrl = await fetch(
          `${import.meta.env.VITE_SERVER}/send-profile-image/${imagePath}`
        );
        imageUrl = await imageUrl.json();

        imageRef.current.src = "data:image/jpg;base64," + imageUrl.imagePath;
        cookies.set("userImage", imagePath);
        // sessionStorage.setItem("userImage", imagePath);
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
        document.getElementById("editModal").close();
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
    };
    input.click();
  };
  const handleEditClick = () => {
    setEditMode(true);
    document.getElementById("editModal").showModal();
  };
  const handleCloseModal = () => {
    document.getElementById("editModal").close();
  };
  const handleCloseModal1 = () => {
    document.getElementById("editModal1").close();
  };
  const handleSaveEdit = async (event) => {
    event.preventDefault();

    if (!editname) {
      toast.error("Please enter a name", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/edit-name`,
      { editname, sessionEmail },
      config
    );
    if (res.data.success) {
      setName(editname);
      cookies.set("name", editname);
      // sessionStorage.setItem("name", editname);
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
      document.getElementById("editModal").close();
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
  };
  const handleNewPass = async () => {
    let res = await fetch(
      `${import.meta.env.VITE_SERVER}/changePassword-afterlogin`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: newPass,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
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
    expref.current.style.display = "none";
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    passRef.current.style.display = "none";
  };
  const handleForgetPass = async () => {
    expref.current.style.display = "none";
    mainRef.current.style.display = "none";
    emailRef.current.style.display = "block";
    passRef.current.style.display = "none";

    if (email != "") {
      checkUserExist();
    }
  };
  const emailRefBack = async () => {
    expref.current.style.display = "none";
    mainRef.current.style.display = "block";
    emailRef.current.style.display = "none";
    passRef.current.style.display = "none";
  };
  const checkUserExist = async () => {
    let res = await fetch(`${import.meta.env.VITE_SERVER}/check-email`, {
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
      expref.current.style.display = "none";
      mainRef.current.style.display = "none";
      emailRef.current.style.display = "none";
      passRef.current.style.display = "block";
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
  };
  const showExp = () => {
    if (expref.current.style.display === "none") {
      expref.current.style.display = "block";
      // window.scrollBy(0, 500);
      window.scrollTo({ top: 500, behavior: "smooth" });
      mainRef.current.classList.remove("mb-32");
      mainRef.current.classList.add("mb-20");
    } else {
      expref.current.style.display = "none";
      window.scrollTo({ top: -500, behavior: "smooth" });
      // window.scrollBy(0, -500);
      mainRef.current.focus();
      mainRef.current.classList.add("mb-32");
      mainRef.current.classList.remove("mb-20");
    }
  };
  const getCompanyLogo = (company) => {
    switch (company) {
      case "Microsoft":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png";
      case "Google":
        return "https://imgs.search.brave.com/RhIO_Tc-OGhbwwdc61rqGCfFacsUlQPNcaIZxOl_CZk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmxvZ29teXdheS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDEvZ29vZ2xl/LXN5bWJvbC5qcGc";
      case "Adobe":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo_2020.svg/1200px-Adobe_Acrobat_DC_logo_2020.svg.png";
      case "Apple":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png";
      case "Amazon":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png";
      case "Atlassian":
        return "https://logos-world.net/wp-content/uploads/2023/03/Atlassian-Logo.png";
      case "Facebook":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png";
      case "TCS":
        return "https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png?t=1631949260";
      case "Infosys":
        return "https://w7.pngwing.com/pngs/687/655/png-transparent-infosys-logo.png";
      case "Netflix":
        return "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
      default:
        return "https://files.codingninjas.in/company-25223.svg";
    }
  };
  useEffect(() => {
    const fetchProfileImages = async () => {
      const promises = exp.map(async (post) => {
        if (post.image) {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER}/send-profile-image/${post.image}`
            );
            const data = await response.json();
            return "data:image/jpg;base64," + data.imagePath;
          } catch (error) {
            console.error("Error fetching profile image:", error);
            return null;
          }
        } else {
          return null;
        }
      });

      const profileImagePaths = await Promise.all(promises);
      // console.log(profileImagePaths);
      setProfileImageSrc(profileImagePaths);
    };

    fetchProfileImages();
  }, [exp]);

  return (
    <div>
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

      <div className="container mx-auto mt-28 mb-32" ref={mainRef}>
        <div>
          <div className="bg-gray-100 relative shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto p-3">
            <div className="h-28 flex justify-center">
              <div className="flex absolute">
                <img
                  ref={imageRef}
                  onMouseEnter={() => {
                    editImageRef.current.style.display = "flex";
                  }}
                  onMouseLeave={() => {
                    editImageRef.current.style.display = "none";
                  }}
                  onClick={() => editProfile()}
                  src={ProfileImage == "" ? image : ProfileImage}
                  alt="Profile Picture"
                  className="rounded-full mx-auto w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110 text-center"
                />
                <span
                  className="z-50 items-end -ml-11 text-4xl"
                  ref={editImageRef}
                  onClick={() => editProfile()}
                  onMouseEnter={() => {
                    editImageRef.current.style.display = "flex";
                  }}
                  onMouseLeave={() => {
                    editImageRef.current.style.display = "none";
                  }}
                >
                  <span className="bg-blue-700 text-white font-bold rounded-full p-1">
                    <CiEdit />
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-10">
              <h1 className="bg-gray-800 rounded-lg font-bold text-center text-3xl text-white p-2 mb-2">
                Username : {name}
              </h1>
              <div className="w-full">
                <div className="w-full flex flex-col items-center overflow-hidden text-sm">
                  <a
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block transition duration-150 text-lg md:text-base hover:bg-gray-300"
                    onClick={() => handleEditClick()}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Edit name
                  </a>
                  <a
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-300 transition duration-150 text-lg md:text-base"
                    onClick={() => handleForgetPass()}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Reset Password
                  </a>
                  <button
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-300 transition duration-150 text-lg md:text-base text-start"
                    onClick={editProfile}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Edit Profile Picture
                  </button>
                  <button
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-300 transition duration-150 text-lg md:text-base text-start"
                    onClick={showExp}
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt=""
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    Show All Experience
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={expref}
        className="relative z-10 bg-gray-100 rounded-lg shadow-md w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto mt-20 scroll-smooth mb-10"
      >
        <div className="flex flex-col font-bold">
          {exp.length > 0 ? (
            exp.map((post, idx) => (
              <div className={`py-0`} key={post._id}>
                <div className="max-w-[85%] mx-auto bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow mt-8 p-2 shadow">
                  <span
                    className={`position-absolute top-0 translate-middle badge rounded-pill text-md flex border-none justify-end items-end w-full ${
                      post.isApproved ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {post.isApproved ? "Approved" : "Pending"}
                  </span>
                  {/* Title block */}
                  <div className="flex items-center justify-between">
                    <div className="p-4 flex items-center ">
                      <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-centern">
                        <img
                          className="max-w-full max-h-full object-cover"
                          src={getCompanyLogo(post.company)}
                          alt="Company Logo"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-xl font-semibold">
                          {post.company} | {post.role} |{" "}
                          {post.expyr == 0
                            ? "Fresher"
                            : `Experience ${post.expyr} year`}
                        </p>
                        <p className="text-gray-600 font-bold">
                          {post.rounds} Rounds
                        </p>
                      </div>
                    </div>
                    <div className="font-bold mr-2">{post.date[0]}</div>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  {/* Profile block */}
                  <div className="px-4 py-2 flex items-center">
                    <div className="bg-gray-300 w-12 mx-2 h-12 rounded-full overflow-hidden">
                      {/* Profile image */}
                      {/* {console.log(profileImageSrc[idx])} */}
                      <img
                        className="w-full  h-full object-cover"
                        src={
                          profileImageSrc[idx]
                            ? profileImageSrc[idx]
                            : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                        }
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-4 px-1">
                      <p className="text-">{post.name}</p>
                      <p className="text-gray-600 text-sm">
                        {post.batch} Batch | Chitkara University
                      </p>
                    </div>
                    <div className="ml-auto flex justify-center items-center">
                      <p
                        className={`font-bold ${
                          post.gotOffer === "yes"
                            ? "text-green-500"
                            : "text-red-900"
                        }`}
                      >
                        {post.gotOffer === "yes" ? (
                          <span className="text-green-500">Selected</span>
                        ) : post.gotOffer === "no" ? (
                          <span className="text-red-500">Not Selected</span>
                        ) : (
                          <span className="text-yellow-500">In Progress</span>
                        )}
                      </p>
                      {!post.isApproved && (
                        <button
                          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => editFromUser(post)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl md:text-xl mt-8 mb-8 font-bold">
              No posts found
            </div>
          )}
        </div>
      </div>

      <div className="mb-8"></div>

      <div
        ref={emailRef}
        className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px] mx-auto mt-20"
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
            Next
          </button>
        </div>
      </div>

      <div
        ref={passRef}
        className="relative z-10 bg-gray-50 p-8 rounded-lg shadow-md w-full sm:w-[96px] md:w-[420px] lg:w-[524px] mx-auto mt-40 mb-20"
      >
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

      <dialog id="editModal1" className="modal">
        <div className="modal-box px-10">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal1}
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Edit the Response:</h3>
          <form>
            {selectedPost && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <textarea
                  type="text"
                  placeholder="First Name"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.name}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      name: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">CGPA</span>
                </label>
                <textarea
                  type="text"
                  placeholder="CGPA"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.cgpa}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      cgpa: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">Got Offer</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Got Offered Yes/No"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.gotOffer}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      gotOffer: e.target.value,
                    })
                  }
                />

                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Email"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.email}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      email: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">Phone</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Phone"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.mobileNo}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      phone: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">
                    LinkedIn Profile Link
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="LinkedIn"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.linkedin}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      linkedin: e.target.value,
                    })
                  }
                />

                <label className="label">
                  <span className="label-text font-semibold">Company</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Company"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.company}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      company: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">Job Role</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Job Role"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.role}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      role: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">
                    Interview Rounds
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Interview Rounds"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.rounds}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      rounds: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">Eligibility</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Eligibility"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.eligibility}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      eligibility: e.target.value,
                    })
                  }
                />
                <label className="label">
                  <span className="label-text font-semibold">
                    Preparation Tips
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Preparation Tips"
                  className="textarea h-10 textarea-bordered mb-3"
                  value={selectedPost.preparationTips}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      preparationTips: e.target.value,
                    })
                  }
                />

                {selectedPost && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Technical Questions
                      </span>
                    </label>
                    {selectedPost.techQuestions &&
                      selectedPost.techQuestions.map((question, index) => (
                        <div className="form-control" key={index}>
                          <label className="label">
                            <span className="label-text">{`Technical Question ${
                              index + 1
                            }`}</span>
                          </label>
                          <div className="flex items-center">
                            <textarea
                              type="text"
                              placeholder={`Technical Question ${index + 1}`}
                              className="textarea h-10 textarea-bordered mb-3 w-full"
                              value={selectedPost.techQuestions[index]}
                              onChange={(e) => {
                                const updatedQuestions = [
                                  ...selectedPost.techQuestions,
                                ];
                                updatedQuestions[index] = e.target.value;
                                setSelectedPost({
                                  ...selectedPost,
                                  techQuestions: updatedQuestions,
                                });
                              }}
                            />
                            <div className="flex items-center">
                              <MdDeleteForever
                                onClick={() =>
                                  handleDeleteQuestion(index, "tech")
                                }
                                className="text-red-500 cursor-pointer mx-2"
                                size={20}
                              />
                              {/* <TiTick
              onClick={() => handleApproveTechQuestion(index)}
              className={`text-green-500 cursor-pointer mx-2 ${
                approvedTechQuestions[index] ? 'opacity-100' : 'opacity-30'
              }`}
            /> */}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {selectedPost && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        HR Questions
                      </span>
                    </label>
                    {selectedPost.hrQuestions &&
                      selectedPost.hrQuestions.map((question, index) => (
                        <div className="form-control" key={index}>
                          <label className="label">
                            <span className="label-text">{`HR Question ${
                              index + 1
                            }`}</span>
                          </label>
                          <div className="flex items-center">
                            <textarea
                              type="text"
                              placeholder={`HR Question ${index + 1}`}
                              className="textarea h-10 textarea-bordered mb-3 w-full"
                              value={selectedPost.hrQuestions[index]}
                              onChange={(e) => {
                                const updatedQuestions = [
                                  ...selectedPost.hrQuestions,
                                ];
                                updatedQuestions[index] = e.target.value;
                                setSelectedPost({
                                  ...selectedPost,
                                  hrQuestions: updatedQuestions,
                                });
                              }}
                            />
                            <div className="flex items-center">
                              <MdDeleteForever
                                onClick={() =>
                                  handleDeleteQuestion(index, "hr")
                                }
                                className="text-red-500 cursor-pointer mx-2"
                                size={20}
                              />
                              {/* <TiTick
              onClick={() => handleApproveHRQuestion(index)}
              className={`text-green-500 cursor-pointer mx-2 ${
                approvedHRQuestions[index] ? 'opacity-100' : 'opacity-30'
              }`}
            /> */}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </form>
          <button
            className="btn btn-primary mt-3"
            onClick={() => editFieldSave(selectedPost._id)}
          >
            Save
          </button>
        </div>
      </dialog>

      <dialog id="editModal" className="modal">
        <div className="modal-box px-10">
          <form method="dialog" onSubmit={handleSaveEdit}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Enter your Name
                </span>
              </label>
              <textarea
                type="text"
                placeholder="Enter new name"
                className="textarea h-10 textarea-bordered mb-3"
                value={editname}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-3" type="submit">
              Save
            </button>
          </form>
        </div>
      </dialog>

      <Footer />
    </div>
  );
};

// const styles = {
//   container: {
//     backgroundColor: "#f0f0f0",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     width: "80vh",
//     borderRadius: "10px",
//   },
//   profileContainer: {
//     textAlign: "center",
//     marginTop: "50px",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profilePicture: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: "60%",
//     marginBottom: "20px",
//     height: "50vh",
//     width: "950%",
//   },
//   buttonsContainer: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     flexDirection: "column",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     padding: "10px 20px",
//     margin: "10px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   },
// };
export default Profile;
