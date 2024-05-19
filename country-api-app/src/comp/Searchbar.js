import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-field">
      <input
        type="text"
        placeholder="Search Country"
        className="searchbar"
        autoComplete="on"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button className="search-btn" onClick={handleSearch}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Searchbar;
