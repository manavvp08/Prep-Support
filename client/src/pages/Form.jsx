import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

function Form() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("Amazon");
  const [otherCompany, setOtherCompany] = useState("");
  const [role, setRole] = useState("");
  const [gotOffer, setGotOffer] = useState("");
  const [location, setLocation] = useState("");
  const [rounds, setRounds] = useState(1);
  const [batch, setBatch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityID, setUniversityID] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cgpa, setCgpa] = useState("Above 9");
  const [eligibility, setEligibility] = useState("Above 9");
  const [questions, setQuestions] = useState(0);
  const [preparationTips, setPreparationTips] = useState("");
  const [hrQuestions, setHRQuestions] = useState([""]);
  const [mistakes, setMistakes] = useState("");
  const [techQuestions, setTechQuestions] = useState([""]);
  const [interviewPrep, Setinterviewprep] = useState("");
  const [IPSubjects, setIPSubjects] = useState([""]);
  const [groupDiscussion, setGroupDisccusion] = useState([""]);
  const isApproved = false;
  let hrFieldRef = useRef();
  let techFieldRef = useRef();
  let ipFieldRef = useRef();
  let groupDiscussionFieldRef = useRef();
  const [OthereligibilityCgpa, setOthereligibilityCgpa] = useState("");
  const [OtherCgpa, setOtherCgpa] = useState("");
  const [userImage, setUserImage] = useState("");
  const cookies = new Cookies();
  const [onlineTestToggle, setOnlineTestToggle] = useState(false);
  const [technicalQuesToggle, setTechnicalQuesToggle] = useState(false);
  const [hrQuesToggle, setHrQuesToggle] = useState(false);
  const [groupDiscussionToogle, setGroupDiscussionToogle] = useState(false);

  useEffect(() => {
    const name = cookies.get("name");
    const email = cookies.get("email");
    const uid = cookies.get("uid");
    const Image = cookies.get("userImage");

    if (name) setName(name);
    if (email) setEmail(email);
    if (uid) {
      setUniversityID(uid);
      setBatch("20" + uid.toString().slice(0, 2));
    }
    if (Image) setUserImage(Image);
  }, []);
  useEffect(() => {
    if (hrQuestions.length > 1) {
      hrFieldRef.current.focus();
    }
  }, [hrQuestions]);
  useEffect(() => {
    if (techQuestions.length > 1) {
      techFieldRef.current.focus();
    }
  }, [techQuestions]);
  useEffect(() => {
    if (IPSubjects.length > 1) {
      ipFieldRef.current.focus();
    }
  }, [IPSubjects]);

  const addHRQuestion = () => {
    setHRQuestions([...hrQuestions, ""]);
  };
  const addIPSubjects = () => {
    setIPSubjects([...IPSubjects, ""]);
  };
  const addTechQuestion = () => {
    setTechQuestions([...techQuestions, ""]);
  };
  const addGroupDiscussion = () => {
    setGroupDisccusion([...groupDiscussion, ""]);
  };

  const handleNextClick1 = () => {
    if (company.trim() !== "" && role.trim() !== "") {
      if (OthereligibilityCgpa) {
        setEligibility(OthereligibilityCgpa.trim());
      }
      setQuestions(1);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };
  const handlePrevClick1 = () => {
    setQuestions(0);
  };
  const handlePrevClick2 = () => {
    setQuestions(1);
  };
  const handleNextClick2 = () => {
    if (name.trim() !== "" && email.trim() !== "") {
      if (OtherCgpa) {
        setCgpa(OtherCgpa.trim());
      }
      setQuestions(2);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const deleteHRQuestion = (index) => {
    const updatedHRQuestions = [...hrQuestions];
    updatedHRQuestions.splice(index, 1);
    setHRQuestions(updatedHRQuestions);
  };
  const deleteTechnicalQuestion = (index) => {
    const updatedTechnicalQuestions = [...techQuestions];
    updatedTechnicalQuestions.splice(index, 1);
    setTechQuestions(updatedTechnicalQuestions);
  };
  const deleteInterviewSubject = (index) => {
    const updatedInterviewSubjects = [...IPSubjects];
    updatedInterviewSubjects.splice(index, 1);
    setIPSubjects(updatedInterviewSubjects);
  };
  const deleteGroupDiscussion = (index) => {
    const updatedHRQuestions = [...groupDiscussion];
    updatedHRQuestions.splice(index, 1);
    setGroupDisccusion(updatedHRQuestions);
  };

  const handleSubmit = async () => {
    const currentDate = new Date().toDateString();
    const currentTime = new Date().toLocaleTimeString();
    const formData = {
      company: company == "Others" ? otherCompany : company,
      role,
      gotOffer,
      location,
      rounds,
      batch,
      name,
      email,
      universityID,
      mobileNo,
      linkedin,
      cgpa: cgpa == "Others" ? OtherCgpa : cgpa,
      eligibility: eligibility == "Others" ? OthereligibilityCgpa : eligibility,
      preparationTips,
      hrQuestions,
      techQuestions,
      mistakes,
      isApproved,
      interviewPrep,
      date: [currentDate, currentTime],
      ipSubjects: IPSubjects,
      image: userImage,
      groupDiscussion: groupDiscussion,
    };
    console.log(formData);
    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER}/experience`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });
      res = await res.json();
      if (res.success) {
        toast.success("Form Submitted Successfully");
        navigate("/formSubmitted");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {questions === 0 && (
        <div>
          <div className="lg:mx-[12%] my-16 p-10">
            <p className="font-bold text-3xl">Interview Experience</p>
            <p className="font-semibold text-xl mt-10 font-sans">ROLE INFO.</p>

            <div className="flex flex-col md:flex-row lg:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Company you Applied to?*
                </label>
                <select
                  name="company"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-80"
                >
                  <option value="Adobe">Adobe</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Apple">Apple</option>
                  <option value="Cisco">Cisco</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google</option>
                  <option value="IBM">IBM</option>
                  <option value="Intel">Intel</option>
                  <option value="Infosys">Infosys</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Netflix">Netflix</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Others">Others</option>
                  <option value="Paypal">Paypal</option>
                  <option value="Salesforce">Salesforce</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Uber">Uber</option>
                  <option value="Others">Others</option>
                </select>
                {company == "Others" && (
                  <input
                    type="text"
                    required
                    onChange={(e) => setOtherCompany(e.target.value)}
                    value={otherCompany}
                    placeholder="Enter Company Name"
                    className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-80 mt-2"
                  />
                )}
              </div>
              <div className="w-80">
                <div className="w-80">
                  <label className="block font-semibold mt-8 mb-5">
                    Batch*
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Eg. 2021"
                    value={batch}
                    className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Enter Cgpa required for applying*
                </label>
                <select
                  name="eligibilityCriteria"
                  id="eligibilityCriteria"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4  appearance-none leading-5 text-gray-700 w-80"
                >
                  <option value="Above 9">Above 9</option>
                  <option value="Above 8">Above 8</option>
                  <option value="Above 7">Above 7</option>
                  <option value="Others">Others</option>
                </select>
                {eligibility == "Others" && (
                  <input
                    type="number"
                    value={OthereligibilityCgpa}
                    required
                    placeholder="Eg. CGPA Above 7 or No in case there is No Eligibility Criteria"
                    className="mt-2 border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4  appearance-none leading-5 text-gray-700 w-80"
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        setOthereligibilityCgpa(0);
                      } else if (e.target.value > 10) {
                        setOthereligibilityCgpa(10);
                      } else {
                        setOthereligibilityCgpa(e.target.value);
                      }
                    }}
                  />
                )}
              </div>

              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Role for Which you applied*
                </label>
                <input
                  type="text"
                  required
                  placeholder="Eg. Sde,Analyst etc"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold my-12 w-full">
                  Did you get an offer?*
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="offerOption"
                      value="yes"
                      onChange={(e) => setGotOffer(e.target.value)}
                      checked={gotOffer === "yes"}
                      required
                    />
                    <span className="mx-5">Yes</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="offerOption"
                      value="no"
                      onChange={(e) => setGotOffer(e.target.value)}
                      checked={gotOffer === "no"}
                    />
                    <span className="mx-5">No</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="offerOption"
                      value="progress"
                      onChange={(e) => setGotOffer(e.target.value)}
                      checked={gotOffer === "progress"}
                    />
                    <span className="mx-5">progress</span>
                  </label>
                </div>
              </div>
              <div className="w-80">
                <label className="block font-semibold my-12">
                  Location Of company?*
                </label>
                <input
                  type="text"
                  placeholder="Eg. Hyderabad,Pune,Delhi etc."
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  No. of Rounds*
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setRounds(0);
                    } else {
                      setRounds(e.target.value);
                    }
                  }}
                  value={rounds}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>

              <div className="w-80"></div>
            </div>
            <button
              onClick={handleNextClick1}
              type="button"
              className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-10 transition duration-300 transform hover:scale-105 my-12"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {questions === 1 && (
        <div>
          <div className="lg:mx-[12%] my-16 p-10">
            <p className="font-bold text-3xl">Interview Experience</p>
            <p className="font-semibold text-xl mt-10 font-sans">
              YOUR PROFILE
            </p>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Your Name*
                </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Your E-mail*
                </label>
                <input
                  type="email"
                  required
                  placeholder="Eg. ABC@xyz.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  University ID*
                </label>
                <input
                  type="number"
                  required
                  onChange={(e) => setUniversityID(e.target.value)}
                  value={universityID}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  LinkedIn Profile Link
                </label>
                <input
                  type="url"
                  onChange={(e) => setLinkedin(e.target.value)}
                  value={linkedin}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Your CGPA*
                </label>
                <select
                  name="eligibilityCriteria"
                  id="eligibilityCriteria"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4  appearance-none leading-5 text-gray-700 w-80"
                >
                  <option value="Above 9">Above 9</option>
                  <option value="Above 8">Above 8</option>
                  <option value="Above 7">Above 7</option>
                  <option value="Others">Others</option>
                </select>
                {cgpa == "Others" && (
                  <input
                    type="number"
                    value={OtherCgpa}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        setOtherCgpa(0);
                      } else if (e.target.value > 10) {
                        setOtherCgpa(10);
                      } else {
                        setOtherCgpa(e.target.value);
                      }
                    }}
                    className="border-2 border-gray-300 focus:outline-none  focus:border-blue-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
                  />
                )}
              </div>
            </div>
            <button
              onClick={handlePrevClick1}
              type="button"
              className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick2}
              type="button"
              className="bg-blue-600 float-right hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {questions == 2 && (
        <div>
          <div className="lg:mx-[12%] my-16 p-10">
            <div>
              <span className="flex justify-center items-center text-2xl mt-2 font-semibold">
                Select the type of rounds in your interview :-
              </span>
              <div className="flex flex-col lg:flex-row justify-center items-center text-lg mt-4 gap-6">
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOnlineTestToggle(true);
                      } else {
                        setOnlineTestToggle(false);
                      }
                    }}
                    className="rounded-full"
                    name="onlineTest"
                    id="onlineTest"
                  />
                  <label className="ml-2" htmlFor="onlineTest">
                    Online/Offline Test
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="rounded-full"
                    name="TechnicalQues"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTechnicalQuesToggle(true);
                      } else {
                        setTechnicalQuesToggle(false);
                      }
                    }}
                    id="TechnicalQues"
                  />
                  <label className="ml-2" htmlFor="TechnicalQues">
                    Technical Rounds
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="rounded-full"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setHrQuesToggle(true);
                      } else {
                        setHrQuesToggle(false);
                      }
                    }}
                    name="HrQues"
                    id="HrQues"
                  />
                  <label className="ml-2" htmlFor="HrQues">
                    HR Rounds
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="rounded-full"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setGroupDiscussionToogle(true);
                      } else {
                        setGroupDiscussionToogle(false);
                      }
                    }}
                    name="groupDiscussion"
                    id="groupDiscussion"
                  />
                  <label className="ml-2" htmlFor="groupDiscussion">
                    Group Discussion
                  </label>
                </div>
              </div>
            </div>
            {onlineTestToggle && (
              <div>
                <p className="font-semibold text-xl mt-8 font-sans">
                  Online/Offline Test Experience
                </p>
                {IPSubjects.map((question, index) => (
                  <div key={index} ref={ipFieldRef}>
                    <label className="block font-semibold mt-8 mb-5">
                      Question {index + 1}
                    </label>
                    <textarea
                      value={question}
                      placeholder={`Enter Online/Offline Question ${index + 1}`}
                      onChange={(e) => {
                        const updatedIPSubjects = [...IPSubjects];
                        updatedIPSubjects[index] = e.target.value;
                        setIPSubjects(updatedIPSubjects);
                      }}
                      className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%]"
                    />
                    <button
                      onClick={() => deleteInterviewSubject(index)}
                      type="button"
                      className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={addIPSubjects}
                  type="button"
                  className="bg-blue-600  hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
                >
                  ADD ONLINE/OFFLINE QUESTION
                </button>
              </div>
            )}
            {technicalQuesToggle && (
              <div>
                <p className="font-semibold text-xl mt-10 font-sans">
                  Technical Rounds Experience
                </p>
                {techQuestions.map((question, index) => (
                  <div key={index} ref={techFieldRef}>
                    <label className="block font-semibold mt-8 mb-5">
                      Question {index + 1}
                    </label>
                    <textarea
                      value={question}
                      placeholder={`Enter Technical Question ${index + 1}`}
                      onChange={(e) => {
                        const updatedTechQuestions = [...techQuestions];
                        updatedTechQuestions[index] = e.target.value;
                        setTechQuestions(updatedTechQuestions);
                      }}
                      className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%]"
                    />
                    <button
                      onClick={() => deleteTechnicalQuestion(index)}
                      type="button"
                      className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={addTechQuestion}
                  type="button"
                  className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
                >
                  ADD TECH QUESTIONS
                </button>
              </div>
            )}
            {hrQuesToggle && (
              <div>
                <p className="font-semibold text-xl mt-10 font-sans">
                  HR Rounds Experience
                </p>
                {hrQuestions.map((question, index) => (
                  <div key={index} ref={hrFieldRef}>
                    <label className="block font-semibold mt-8 mb-5">
                      Question {index + 1}
                    </label>
                    <textarea
                      value={question}
                      placeholder={`Enter HR Question ${index + 1}`}
                      onChange={(e) => {
                        const updatedHRQuestions = [...hrQuestions];
                        updatedHRQuestions[index] = e.target.value;
                        setHRQuestions(updatedHRQuestions);
                      }}
                      className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%]"
                    />
                    <button
                      onClick={() => deleteHRQuestion(index)}
                      type="button"
                      className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={addHRQuestion}
                  type="button"
                  className="bg-blue-600  hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
                >
                  ADD HR QUESTION
                </button>
              </div>
            )}
            {groupDiscussionToogle && (
              <div>
                <p className="font-semibold text-xl mt-10 font-sans">
                  Group Discussion Experience
                </p>
                {groupDiscussion.map((question, index) => (
                  <div key={index} ref={groupDiscussionFieldRef}>
                    <label className="block font-semibold mt-8 mb-5">
                      Question {index + 1}
                    </label>
                    <textarea
                      value={question}
                      placeholder={`Enter HR Question ${index + 1}`}
                      onChange={(e) => {
                        const updatedHRQuestions = [...groupDiscussion];
                        updatedHRQuestions[index] = e.target.value;
                        setGroupDisccusion(updatedHRQuestions);
                      }}
                      className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%]"
                    />
                    <button
                      onClick={() => deleteGroupDiscussion(index)}
                      type="button"
                      className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={addGroupDiscussion}
                  type="button"
                  className="bg-blue-600  hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
                >
                  ADD GROUP DISCUSSION QUESTION
                </button>
              </div>
            )}
            <label className="block font-semibold mt-4 mb-5">Summary</label>
            <textarea
              value={preparationTips}
              placeholder="Summarized your experience."
              className="border-2 border-gray-300 focus:outline-none focus:border-blue-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-[80%] lg:w-[65%] h-[200px] resize-none"
              onChange={(e) => setPreparationTips(e.target.value)}
            />
            <button
              onClick={handlePrevClick2}
              type="button"
              className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              Previous
            </button>
            <Link
              to="/formSubmitted"
              onClick={handleSubmit}
              className="bg-blue-600 float-right hover:bg-blue-400 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-12"
            >
              SUBMIT
            </Link>
          </div>
        </div>
      )}
      ;
    </div>
  );
}
export default Form;
