import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaCity, FaUserGroup } from "react-icons/fa6";
import { SlGlobe } from "react-icons/sl";
import { Parallax } from "react-parallax";
import InfoCard from "./InfoCard";
import Searchbar from "./Searchbar";
import ScrollToTop from "./ScrollToTop";
import Masonry from "react-masonry-css";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Search function (searchbar prop)
  const handleSearch = (searchTerm) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  return (
    <>
      <div className="container">
        <div>
          <Parallax
            blur={4}
            bgImage="./world.avif"
            bgImageAlt="word countries"
            strength={200}
            className="parallax-header"
            renderLayer={(percentage) => (
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: `rgba(0, 0, 0, ${percentage * 0.5})`,
                }}
              />
            )}
          >
            <div className="header">
              <h1 className="header-title">WHERE IN THE HELLO WORLD?</h1>
              <h5 className="text3">
                {" "}
                Get ready to embark on an unforgettable expedition as you
                uncover the beauty and wonders of our planet.
              </h5>
              <div className="header-content">
                <Searchbar onSearch={handleSearch} />
              </div>
            </div>
          </Parallax>
        </div>

        <div className="page-header">
          <h2 className="text2">
            Welcome to our immersive journey through the diverse and captivating
            landscapes of our world.
          </h2>

          {/* <div className="  ">
          <p className="text2">
            Welcome to our immersive journey through the diverse and captivating
            landscapes of our world. Embark on an adventure that transcends
            borders, as we unveil the hidden gems waiting to be explored.{" "}
          </p>
          <p className="text2">
          Explore the vibrant cultures and rich histories that shape our global community. Immerse yourself in the sights, sounds, and flavors of distant lands, where every corner tells a story waiting to be discovered. Whether you're drawn to the ancient ruins of civilizations past or the modern marvels of contemporary architecture, there's something to captivate every traveler's heart.
          </p>
          
        </div> */}
        </div>

        <div className="">
          <Masonry className="flags-container" breakpointCols={5}>
            {filteredCountries.map((country) => (
              <div className="card" key={country.name.common}>
                <Link
                  to={`/countries/${country.name.common}`}
                  onClick={() => setSelectedCountry(country.name.common)}
                  
                >
                  <div className="block">
                    <img
                      className="flag-img"
                      src={country.flags.png}
                      alt={`Flag of ${country.name.common}`}
                    />
                  </div>
                  <div className="card-info">
                    <p className="title">{country.name.common}</p>
                    <p className="text">
                      <FaUserGroup /> {country.population}
                    </p>
                    <p className="text">
                      {" "}
                      <FaCity />  
                      {/* seperate with comma if there is more than 1 capital */}
                      {" "}{country.capital && country.capital.join(", ")}
                    </p>
                    <p className="text">
                      {" "}
                      <SlGlobe /> {country.region}
                    </p>
                    <br />
                  </div>
                </Link>
              </div>
            ))}
          </Masonry>
        </div>
        {selectedCountry && <InfoCard countryName={selectedCountry} />}
        <button className="scroll-to-top" onClick={scrollToTop}>
          <span>
            <FaArrowUp />
          </span>
        </button>
      </div>
    </>
  );
};

export default HomePage;
