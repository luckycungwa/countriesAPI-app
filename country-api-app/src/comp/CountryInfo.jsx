import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// import HomePage from "./HomePage";

const CountryInfo = () => {
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Function to fetch detailed country information from the API
    const fetchCountryDetails = async () => {
      try {
        // FETCH COUNTRY NAME BY FULL NAME AND CATCH ANY ERRO IF NEED BE
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const data = await response.json();
        setCountryDetails(data[0]); // The API returns an array, but we take the first item
      } catch (error) {
        console.error("Error fetching country details: ", error);
      }
    };

    // Call the fetch function
    fetchCountryDetails();
  }, [countryName]);

  if (!countryDetails) {
    return <h2>Loading country details...</h2>; // You can add a loading state here while data is fetched
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
  } = countryDetails;

  // PAGE NAVIGATION | RETURN BACK
  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <div className="country-details">
      <div className="country-img">
        <img
          className="flag-img"
          src={countryDetails.flags.png}
          alt={`Flag of ${countryDetails.name}`}
        />
      </div>
      <div className="wrap">
        <ul>
          <li className="h1">{countryDetails.name.common}</li>
          <br />

          <li>Native Name: {countryDetails.name.common}</li>
          <li>Population: {population}</li>
          <li>Region: {region}</li>
          <li>Sub-region: {subregion}</li>

          {/* INCASE DATA HAS MULTIPLE RESULTS AVAILABLE & SEPERATE BY COMMA| maybe add currency, abbreviation, president, etc.*/}
          {/* --------------------------- LANGUAGE(s) -------------------------- */}
          {languages && Object.values(languages).length > 0 && (
            <li>Languages: {Object.values(languages).join(", ")}</li>
          )}
          {/* --------------------------- NATIONALITY(ies) -------------------------- */}
          {demonyms && demonyms.common && (
            <li>Nationality: {demonyms.common}</li>
          )}
          {/* ------ CALL CODE(s) +27 XXX | Currently not working for most (REMOVE OR MODIFY)-------- */}
          {callingCodes && callingCodes.length > 0 && (
            <li>Calling Codes: {callingCodes.join(", ")}</li>
          )}
          {/* -------------------------- TLD(s) -------------------------- */}
          {tld && tld.length > 0 && (
            <li>Top Level Domain (TLD): {tld.join(", ")}</li>
          )}
        </ul>
        <br />
      {/* RETURN TO HOME BUTTON */}
      <button className="cta-btn" onClick={handleGoBack}>
        GO BACK
      </button>
      <br />
      </div>
      
    </div>
  );
};

export default CountryInfo;
