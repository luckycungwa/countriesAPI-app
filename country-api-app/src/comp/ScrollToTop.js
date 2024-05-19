import React from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling animation
    });
  };

  return (
    <button className="scroll-to-top" onClick={scrollToTop}>
      <FaArrowUp />
      <span className="sr-only">Scroll to Top</span>
    </button>
  );
};

export default ScrollToTop;
