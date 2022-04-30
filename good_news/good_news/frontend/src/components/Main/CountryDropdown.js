import React, { useState, useEffect } from 'react';
import { countryData } from "./countryList";



// const CountryDropdown = (params) => {
//   // useEffect(() => {
//   // countryData.map(function (value) {
//   //     value.flag = value.flag.toLowerCase();
//   //     return value;
//   //   });
//   //   console.log(countryData)
//   // });



//   return (
//     <div className="container">
//       <select>
//         <option value="Orange">Orange</option>
//         <option value="Radish">Radish</option>
//         <option value="Cherry">Cherry</option>
//       </select>
     
//       {/* <Select options={countryData} /> */}
//     </div>


//   );
// }

// export default CountryDropdown;


class CountryDropdown extends React.Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          Dropdown
        </button>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#nogo">
            Item 1
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 2
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 3
          </a>
        </div>
      </div>
    );
  }
}
export default CountryDropdown;
