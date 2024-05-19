import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CardSpinner from "./CardSpinner";
import InfoCard from "./InfoCard";
import { FaArrowLeft } from "react-icons/fa6";

const CountryInfo = () => {
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [flagColors, setFlagColors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const data = await response.json();
        setCountryDetails(data[0]);

        // Fetch the flag colors JSON file
        const flagColorsResponse = await fetch(
          // fetch country-colors.json
          "/country-colors.json"
        );
        if (!flagColorsResponse.ok) {
          throw new Error("Failed to fetch flag colors");
        }
        const flagColorsData = await flagColorsResponse.text();
        console.log(flagColorsData); // Log the response
        const flagColorsJson = JSON.parse(flagColorsData); // Parse the JSON
        // Find the entry for the current country and set its flag colors
        const countryColors = flagColorsJson.find(
          (country) => country.name === countryName
        );
        if (countryColors) {
          setFlagColors(countryColors.colors);
        } else {
          console.error(`Flag colors not available for ${countryName}`);
        }
      } catch (error) {
        console.error("Error fetching country details: ", error);
        // Handle the error (e.g., display an error message)
      }
    };

    fetchCountryDetails();
  }, [countryName]);

  if (!countryDetails) {
    return (
      <div className="App-header">
        <h2>Loading country details...</h2>
      </div>
    );
  }

  //Initialize more country details
  const {
    // name,     MIGHT HAVE TO CHANGE TO NATIVE NAME
    population,
    region,
    subregion,
    languages,
    demonyms,
    callingCodes,
    tld,
    capital,
  } = countryDetails;

  // PAGE NAVIGATION | RETURN BACK
  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <div className="country-details">
      {/* <div> */}
        {" "}
        {/* RETURN TO HOME BUTTON */}
        <button className="scroll-back" onClick={handleGoBack}>
          <span>
            <FaArrowLeft />{" "}
          </span>
        </button>
      {/* </div> */}
      <div className="section">
        <div className="country-img">
          {/* aternary if statement on hover alternate between flag & coat of arms */}
          <CardSpinner />

          <div className="flag-colors">
            {/* display flag colors */}
            {flagColors.map((color, index) => (
              <div
                className="flag-color"
                key={index}
                style={{ backgroundColor: color }}
              >
                <p className="flag-color-text">{color}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="country-info">
          <h3 className="h1">{countryDetails.name.common}</h3>
          <br></br>
          <div className="info2">
            <p>Native Name: {countryDetails.name.common}</p>
            {capital && capital.length > 0 && (
              <p>Capital(s): {capital.join(", ")}</p>
            )}
            {/* <p>Top Level Domain: {tld}</p> */}
            {/* <p>Area: {countryDetails.area}</p> */}

            <p>Population: {population}</p>
            <p>Region: {region}</p>

            {/* <p>Currency: {currency && currency.name}</p> */}
            {/* <p>Sub-region: {subregion}</p> */}

            {/* INCASE DATA HAS MULTIPLE RESULTS AVAILABLE & SEPERATE BY COMMA| maybe add currency, abbreviation, president, etc.*/}
            {/* --------------------------- LANGUAGE(s) -------------------------- */}
            {languages && Object.values(languages).length > 0 && (
              <p>Language(s): {Object.values(languages).join(", ")}</p>
            )}
            {/* --------------------------- NATIONALITY(ies) -------------------------- */}
            {demonyms && demonyms.common && (
              <li>Nationality: {demonyms.common}</li>
            )}
            {/* ------ CALL CODE(s) +27 XXX | Currently not working for most (REMOVE OR MODIFY)-------- */}
            {callingCodes && callingCodes.length > 0 && (
              <p>Calling Codes: {callingCodes.join(", ")}</p>
            )}
            {/* -------------------------- TLD(s) -------------------------- */}
            {/* {tld && tld.length > 0 && (
            <p>Top Level Domain (TLD): {tld.join(", ")}</p>
          )} */}
          </div>

          <br />
          <div className="info2">
            <h2>Description</h2>
            <p className="paragraph">
              Welcome to the enchanting world of {countryDetails.name.official},
              where {population} beautiful people call home amidst the{" "}
              {countryDetails.name.official}'s embrace. Situated in {subregion},
              this land speaks {Object.values(languages).join(", ")} as their
              cultural symphony, echoing tales of unity and diversity. From its
              bustling cities to its serene countryside,{" "}
              {countryDetails.name.official} beckons with promises of discovery
              and wonder. Whether you're drawn to its historical landmarks,
              natural wonders, or vibrant cultural tapestry, there's something
              here to captivate every heart. Come, explore the magic of{" "}
              {countryDetails.name.official} and immerse yourself in its beauty.
              With their Top level domain as "{tld}".
            </p>
            <br />
          </div>
        </div>
      </div>

      {/* new scction */}
      <div>
        {/* <InfoCard countryName={countryName} /> */}
      </div>
    </div>
  );
};

export default CountryInfo;
