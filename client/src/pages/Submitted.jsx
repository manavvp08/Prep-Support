import React from "react";
import { Link } from "react-router-dom";

function Submitted() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Thank You</h1>
            <p className="mb-5">
              Your response has been successfully submitted! You will be mailed
              your reponse status soon.{" "}
            </p>
            <Link to="/">
              <button className="btn btn-primary">Go To Home</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Submitted;
