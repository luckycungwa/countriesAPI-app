import React from "react";
import { useState, useEffect } from "react";

const HomePage = () => {
  // set up country state | Array
  const [countries, setCountries] = useState([]);
  // states for search results
  const [searchCountry, setSearchCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  // refer to weatherMap API for fetch style
  useEffect(() => {
    // Function to fetch data from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        // fetch all countries bydefault
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    // fetch data
    fetchCountries();
  }, []);

  //   setting up useState for managing the search functionalityu
  useEffect(() => {
    // Function to filter countries based on the search query
    const filterCountries = () => {
      // disable case sensitivity
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      );
      setFilteredCountries(filtered);
    };

    // Refresh search when serach input changes
    filterCountries();
  }, [searchCountry, countries]);

  //Manage search input change | results
  const handleSearch = (e) => {
    setSearchCountry(e.target.value);
  };

  return (
    // search & list countries
    <>
      <div class="search-field">
        <div className="icon">
          <span>&#9906;</span>
        </div>

        <input
          placeholder="Search"
          type="search"
          class="search-input left"
          onChange={handleSearch}
        ></input>
        <br/>
        <br/>
      </div>

      <div className="">
      <div>

      </div>
        <div className="info-container">
          {filteredCountries.map((country) => (
            <div className="card " key={country.name.common}>
              <div className="card-img">
                <img
                  className="flag-img"
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                />
              </div>
              {/* Country info */}
              <div className="info">
                <ul>
                  <li className="title">{country.name.common}</li>
                  <br />
                  <li>Population: {country.population}</li>
                  <li>Capital: {country.capital}</li>
                  <li>Region: {country.region}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
