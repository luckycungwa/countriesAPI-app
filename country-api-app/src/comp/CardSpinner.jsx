import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { countryDetails } from '../comp/CountryInfo';
import { Tooltip } from "react-tooltip";

const CardSpinner = () => {
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);

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
    currency,
    capital,
  } = countryDetails;

  return (
    <>
      <div className="card-spin">
     
        <div className="card-inner">
          <div className="card-front">
            <img
              className="flag-img"
              src={countryDetails.flags.svg}
              alt={`Flag of ${countryDetails.name}`}
            />
          </div>
          <div className="card-back">
          {/* tooltip when user hovers over coat of arms */}
           
            <p className="card-title">coat of arms</p>
              <img
                className="flag-img"
                src={countryDetails.coatOfArms.png}
                alt={` ${countryDetails.name.common} coat of arms`}
              />
              
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSpinner;
