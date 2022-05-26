import React from 'react';
import countryData from "../../data/countryList";

const CountryDropdown = (params) => {
  return (
    <div className="container">
    <select className="form-select form-select-lg mb-3" name="cars" id="cars">
    <option selected>Select Country</option>
    {countryData.map((eachcountryDetails, i) => (
        <option value={eachcountryDetails.value}>{eachcountryDetails.label}</option>
    ))} 
    </select>
</div>


  );
}

export default CountryDropdown;

