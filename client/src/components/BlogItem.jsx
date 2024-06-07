import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
import Loader from "./Loader";
import axios from "axios";

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
const popularCompanies = [
  "Adobe",
  "Apple",
  "Amazon",
  "Cisco",
  "Facebook",
  "Google",
  "IBM",
  "Infosys",
  "Intel",
  "LinkedIn",
  "Microsoft",
  "Netflix",
  "Oracle",
  "Paypal",
  "Salesforce",
  "Twitter",
  "Uber",
  "Others",
];
const d = new Date().getFullYear();
const popularYear = [
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  d,
];

function BlogItem() {
  const [loading, setLoading] = useState(true);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [allCompany, setAllCompany] = useState([]);
  let [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [fromSearch, setFromSearch] = useState("2016");
  const [toSearch, setToSearch] = useState(d);
  const [otherCompany, setOtherCompany] = useState("");
  const [isSelected, setIsSelected] = useState("both");
  const companyRef = useRef();
  const postImageRef = useRef();
  let [approvedPost, setApprovedPost] = useState(0);
  let [presentPostImg, setPresentPostImg] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await fetch(
          `${import.meta.env.VITE_SERVER}/get-experience`
        );
        response = await response.json();
        // Sort the fetched posts by date in descending order
        const sortedPosts = response.exp.sort((a, b) => {
          const timeA = new Date(`${a.date[0]} ${a.date[1]}`);
          const timeB = new Date(`${b.date[0]} ${b.date[1]}`);

          if (isNaN(timeA.getTime()) || isNaN(timeB.getTime())) {
            return 0;
          }

          return timeB - timeA;
        });
        for (let post of sortedPosts) {
          if (post.isApproved) {
            setApprovedPost(approvedPost++);
          }
        }

        setSearchedPosts(sortedPosts);

        setAllCompany(sortedPosts);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (selectedCompany === "Others") {
      companyRef.current && companyRef.current.focus();
    }
  }, [selectedCompany]);

  const handleSearch = () => {
    let filteredPosts = allCompany;
    const fromYear = parseInt(fromSearch);
    const toYear = parseInt(toSearch);
    let selectedCompanyPosts = [];

    if (selectedCompany == "All Companies") {
      for (let obj of filteredPosts) {
        let d = new Date(obj.date[0]);
        let year = d.getFullYear();

        if (isSelected == "both") {
          if (year >= fromYear && year <= toYear) {
            selectedCompanyPosts.push(obj);
          }
        } else {
          if (
            year >= fromYear &&
            year <= toYear &&
            obj.gotOffer.toLowerCase() == isSelected
          ) {
            selectedCompanyPosts.push(obj);
          }
        }
      }
      setSearchedPosts(selectedCompanyPosts);
    } else if (selectedCompany != "Others" && isSelected == "both") {
      for (let obj of filteredPosts) {
        let d = new Date(obj.date[0]);
        let year = d.getFullYear();

        if (
          year >= fromYear &&
          year <= toYear &&
          obj.company.toLowerCase() == selectedCompany.toLowerCase()
        ) {
          selectedCompanyPosts.push(obj);
        }
      }

      setSearchedPosts(selectedCompanyPosts);
    } else {
      if (selectedCompany == "Others") {
        selectedCompany = otherCompany;
      }
      for (let obj of filteredPosts) {
        let d = new Date(obj.date[0]);
        let year = d.getFullYear();

        if (
          year >= fromYear &&
          year <= toYear &&
          obj.company.toLowerCase() == selectedCompany.toLowerCase() &&
          obj.gotOffer.toLowerCase() == isSelected
        ) {
          selectedCompanyPosts.push(obj);
        }
      }

      setSearchedPosts(selectedCompanyPosts);
    }
  };

  // for auto starting the server

  useEffect(() => {
    const fetchProfileImages = async () => {
      const promises = searchedPosts.map(async (post) => {
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

      setProfileImageSrc(profileImagePaths);
    };

    fetchProfileImages();
  }, [searchedPosts]);

  // admin@prephelp.com
  // admin123

  const handleClearFilters = () => {
    setSelectedCompany("All Companies");
    setFromSearch("2016");
    setToSearch(new Date().getFullYear());
    setOtherCompany("");
    setIsSelected("both");
    setSearchedPosts(allCompany);
  };

  return (
    <div id="list_of_exp">
      <div className="flex items-center justify-center ml-5 mr-5 md:ml-16 md:mr-16">
        <div className="flex flex-col items-center justify-center gap-5 md:gap-2 lg:flex-row flex-wrap">
          <div className="flex flex-col justify-center items-center gap-3 md:gap-2 md:flex-row">
            <p className="me-4 font-bold">Sort By Companies : </p>
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setOtherCompany("");
              }}
              className="p-2 border border-gray-300 rounded-md mr-2"
            >
              <option key="All Companies" value="All Companies">
                All Companies
              </option>
              {popularCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            {selectedCompany == "Others" && (
              <input
                ref={companyRef}
                type="text"
                value={otherCompany}
                onChange={(e) => setOtherCompany(e.target.value)}
                placeholder="Enter Company Name"
                className="p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-3 md:gap-2 md:flex-row">
            <p className="me-4 font-bold">Sort By Selection:</p>
            <select
              value={isSelected}
              onChange={(e) => setIsSelected(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mr-2"
            >
              <option key="both" value="both">
                Both
              </option>
              <option key="yes" value="yes">
                Selected
              </option>
              <option key="no" value="no">
                Not Selected
              </option>
            </select>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 md:gap-2 md:flex-row">
            <p className="me-4 font-bold">Sort By Year : </p>
            <select
              value={fromSearch}
              onChange={(e) => setFromSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mr-2"
            >
              {popularYear.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <span>To</span>
            <select
              value={toSearch}
              onChange={(e) => setToSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mr-2"
            >
              {popularYear.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleSearch()}
              className="bg-blue-700 text-white p-2 rounded-full ml-2 px-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
            >
              Search
            </button>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleClearFilters}
              className="bg-blue-700 text-white p-2 rounded-full ml-2 px-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : searchedPosts.length > 0 && approvedPost > 0 ? (
        searchedPosts.map(
          (post, idx) =>
            post.isApproved && (
              <div className="py-3 " key={post._id}>
                <Link to={`/post/${post._id}`}>
                  <div className="max-w-[85%] mx-auto bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow mt-8 p-2 shadow">
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
                            {post.rounds} Rounds | 6 Coding Problems
                          </p>
                        </div>
                      </div>
                      <div className="font-bold mr-2">{post.date[0]}</div>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    {/* Profile block */}
                    <div className="px-4 py-2 flex items-center">
                      <div className="bg-gray-300 w-12 mx-2 h-12 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
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
                      <div className="ml-auto flex">
                        <p
                          className={`font-bold ${
                            post.gotOffer.toLowerCase() === "yes"
                              ? "text-green-500"
                              : "text-red-800"
                          }`}
                        >
                          {post.gotOffer.toLowerCase() === "yes"
                            ? "Selected"
                            : post.gotOffer.toLowerCase() === "no"
                            ? "Not-Selected"
                            : "in Progress"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
        )
      ) : (
        <div className="text-center text-2xl md:text-xl mt-8 mb-8 font-bold">
          No posts found
        </div>
      )}
    </div>
  );
}
export default BlogItem;
