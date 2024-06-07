import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Question from "../components/Question";
import FooterPage from "./FooterPage";
import Footer from "../components/Footer";

const questionsData = [
  {
    id: 1,
    title: "How to implement a self join in SQL?",
    category: "Tech",
    company: "Microsoft",
  },
  {
    id: 2,
    title: "What are your favorite books?",
    category: "Non-Tech",
    company: "Cantilever",
  },
  {
    id: 3,
    title: "Explain the MapReduce paradigm and its usage at Google.",
    category: "Tech",
    company: "Google",
  },
  {
    id: 4,
    title:
      "What is Amazon Web Services (AWS) and how can it benefit businesses?",
    category: "Tech",
    company: "Amazon",
  },
  {
    id: 5,
    title:
      "How does Adobe Photoshop utilize artificial intelligence for image editing?",
    category: "Tech",
    company: "Adobe",
  },
  {
    id: 6,
    title: "Describe the role of Microsoft Azure in cloud computing.",
    category: "Tech",
    company: "Microsoft",
  },
  {
    id: 7,
    title: "What are the key principles of Google's design philosophy?",
    category: "Non-Tech",
    company: "Google",
  },
  {
    id: 8,
    title:
      "Discuss the impact of Amazon's business model on traditional retail.",
    category: "Non-Tech",
    company: "Amazon",
  },
  {
    id: 9,
    title: "How does Adobe support diversity and inclusion in its workplace?",
    category: "Non-Tech",
    company: "Adobe",
  },
  {
    id: 10,
    title: "Explain Microsoft's approach to corporate social responsibility.",
    category: "Non-Tech",
    company: "Microsoft",
  },
  // Add more questions as needed
];

function Questions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Initialize to empty string
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleSearch = () => {
    const filtered = questionsData.filter((question) => {
      const categoryMatch =
        selectedCategory === "" || question.category === selectedCategory;
      const companyMatch = question.company
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return categoryMatch && companyMatch;
    });

    setFilteredQuestions(filtered);
  };

  // Trigger the initial load of all questions
  useEffect(() => {
    handleSearch();
  }, [selectedCategory,searchQuery]); // Empty dependency array ensures it only runs once on mount

  return (
    <>
      <Navbar
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchQuery={searchQuery}
        onSearchSubmit={handleSearch}
        onSelectCategory={(category) => setSelectedCategory(category)}
        selectedCategory={selectedCategory}
      />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center mt-10 p-10">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 ml-[8%]">Questions</h1>
          <div className="mb-4 px-[15%]">
            <label className="mr-2">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mr-2 p-2 border border-gray-300"
            >
              <option value="">All</option>
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
            <label className="mr-2">Filter by Company:</label>
            <input
              type="text"
              placeholder="Enter company name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 px-4 mx-4 rounded-lg hover:shadow-lg hover:bg-blue-400"
            >
              Search
            </button>
          </div>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <Question key={question.id} question={question} />
            ))
          ) : (
            <p>No questions found for the specified filters.</p>
          )}
        </div>
        <Footer className="w-full" />
      </div>
    </>
  );
}

export default Questions;
