import React from "react";
import Navbar from "../components/Navbar";
import Top from "../components/Top";
import BlogItem from "../components/BlogItem";

import Footer from "../components/Footer";

function Home() {
  return (
    <div className="">
      <Navbar />
      <Top />

      <BlogItem />

      <Footer />
    </div>
  );
}

export default Home;
