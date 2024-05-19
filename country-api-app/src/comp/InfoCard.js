import React, { Component } from "react";
import axios from "axios";
import { openExchangeRatesApiKey, openCageApiKey } from "../config";

export class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryInfo: null,
      gdp: null,
      unemploymentRate: null,
      lifeExpectancy: null,
      currencySymbol: null,
      error: null
    };
  }

  componentDidMount() {
    this.fetchCountryInfo();
    this.fetchAdditionalInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.countryName !== this.props.countryName) {
      this.fetchCountryInfo();
      this.fetchAdditionalInfo();
    }
  }

  fetchCountryInfo = async () => {
    try {
      const { countryName } = this.props;
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${countryName}&key=${openCageApiKey}`
      );
      if (!response.data.results || response.data.results.length === 0) {
        throw new Error("Country not found");
      }
      this.setState({
        countryInfo: response.data.results[0].components,
        error: null
      });
    } catch (error) {
      console.error("Error fetching country information:", error);
      this.setState({
        error: "Failed to fetch country information"
      });
    }
  };

  fetchAdditionalInfo = async () => {
    try {
      const { countryName } = this.props;
  
      // Fetch currency data
      const currencyResponse = await axios.get(
        `https://v6.exchangerate-api.com/v6/${openExchangeRatesApiKey}/latest/USD`
      );
      const currencyData = currencyResponse.data;
  
      // Find currency data for the given country
      const currencyInfo = currencyData.conversion_rates[countryName];
  
      if (!currencyInfo) {
        throw new Error("Currency information not available for the country");
      }
  
      const { gdp, unemployment, life_expectancy } = await axios.get(
        `http://api.worldbank.org/v2/country/${countryName.toLowerCase()}?format=json`
      ).then(response => response.data[1][0]);
  
      const { currencySymbol } = currencyInfo;
  
      this.setState({
        gdp: gdp.value,
        unemploymentRate: unemployment.value,
        lifeExpectancy: life_expectancy.value,
        currencySymbol: currencySymbol,
        error: null
      });
    } catch (error) {
      console.error("Error fetching additional information:", error);
      this.setState({
        error: "Currency information not available for the country"
      });
    }
  };
  
  

  render() {
    const { countryInfo, gdp, unemploymentRate, lifeExpectancy, currencySymbol, error } = this.state;
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!countryInfo) {
      return <div className="container">Loading...</div>;
    }
  
    return (
      <>
        <div className="info-container">
          <div className="info-card">
            <p>Country Name</p>
            <p>{countryInfo.country}</p>
          </div>
          <div className="info-card">
            <p>Currency Symbol</p>
            <p>{countryInfo.currency_symbol }</p>
          </div>
          <div className="info-card">
            <p>GDP</p>
            <p>{gdp}</p>
          </div>
          <div className="info-card">
            <p>Unemployment Rate</p>
            <p>{unemploymentRate}</p>
          </div>
          <div className="info-card">
            <p>Life Expectancy</p>
            <p>{lifeExpectancy}</p>
          </div>
        </div>
      </>
    );
  }
  
}

export default InfoCard;
