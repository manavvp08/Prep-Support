import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InterviewForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [gotOffer, setGotOffer] = useState("");
  const [location, setLocation] = useState("");
  const [rounds, setRounds] = useState("");
  const [roundDetails, setRoundDetails] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // ... (Other state variables)

  const addRoundDetail = () => {
    setRoundDetails([
      ...roundDetails,
      {
        type: "",
        date: "",
        difficulty: "",
        duration: "",
        platform: "",
        location: "",
        description: "",
        mcqCount: 0,
        mcqTopics: "",
        problems: [{ name: "", expectedSolution: "", link: "" }],
      },
    ]);
  };

  const handleNext = () => {
    // Validation for the current step
    if (step === 1 && (company.trim() === "" || role.trim() === "")) {
      alert("Please fill in all required fields.");
      return;
    }

    // Additional validations for other steps if needed

    // Move to the next step
    setStep(step + 1);
  };

  const handlePrev = () => {
    // Move to the previous step
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Form data
    const formData = {
      company,
      role,
      gotOffer,
      location,
      rounds,
      batch,
      roundDetails,
      // ... (Other form fields)
    };

    console.log(formData);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/experience`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });
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
    <div className="lg:mx-[12%] my-12">
      <p className="font-bold text-3xl">Interview Experience</p>

      {step === 1 && (
        <div className="lg:mx-[12%] my-12">
          <p className="font-bold text-3xl">Interview Experience</p>
          <p className="font-semibold text-xl mt-10 font-sans">ROLE INFO.</p>
          <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
            <div className="w-80">
              <label className="block font-semibold mt-8 mb-5">
                Company you Applied to?*
              </label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border-2 border-gray-300 focus:outline-none focus:border-orange-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700"
              >
                <option value="" disabled>
                  Select a company
                </option>
                <option value="Microsoft">Microsoft</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {company === "Other" && (
              <div className="w-80">
                <label className="block font-semibold mt-8 mb-5">
                  Other Company*
                </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setCompany(e.target.value)}
                  value={otherCompany}
                  className="border-2 border-gray-300 focus:outline-none focus:border-orange-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-80"
                />
              </div>
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
              className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block appearance-none leading-5 text-gray-700 w-80"
            />
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row lg:space-x-64 md:space-x-52">
            <div className="w-80">
              <label className="block font-semibold my-8">
                Did you get an offer?
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
              </div>
            </div>
            <div className="w-80">
              <label className="block font-semibold my-8">
                Location Of company?
              </label>
              <input
                type="text"
                placeholder="Eg. Hyedrabad,Pune,Delhi etc."
                required
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="border-2 border-gray-300 focus:outline-none focus:border-orange-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
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
                onChange={(e) => setRounds(e.target.value)}
                value={rounds}
                className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
              />
            </div>
            <div className="w-80">
              <label className="block font-semibold mt-8 mb-5">Batch*</label>
              <input
                type="number"
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Eg. 2021"
                value={batch}
                className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
              />
            </div>
          </div>
          <button
            onClick={handleNextClick1}
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-8"
          >
            Next
          </button>
        </div>
      )}

      {/* ... (Other steps) */}

      {step === 5 && (
        <div>
          <label className="block font-semibold mt-8 mb-5">
            Number Of Rounds*
          </label>
          <input
            type="number"
            onChange={(e) => {
              setRounds(e.target.value);
              setRoundDetails([]);
            }}
            value={rounds}
            className="border-2 border-gray-300 focus:outline-none  focus:border-orange-400 rounded-md py-2 px-4 block  appearance-none leading-5 text-gray-700 w-80"
          />

          {Array.from({ length: rounds }, (_, index) => (
            <div key={index} className="rounded-md border p-4 mt-4">
              <p className="font-semibold text-xl mb-2">Round {index + 1}</p>
              {/* ... (Round Details Input for each round) */}
            </div>
          ))}

          <button
            onClick={handlePrev}
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-8"
          >
            Previous
          </button>
          <Link
            to="/formSubmitted"
            onClick={handleSubmit}
            className="bg-orange-500 float-right hover:bg-orange-600 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-105 my-8"
          >
            SUBMIT
          </Link>
        </div>
      )}
    </div>
  );
};

export default InterviewForm;
