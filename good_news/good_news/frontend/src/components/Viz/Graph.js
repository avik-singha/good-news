import React, { useState } from "react";
import StackedBarChart from "./StackedBarChart";
import { co2EmissionData } from "../../data/co2emission";
import { worldCurrency } from "../../data/world_currency_euro_rate";

import moment from 'moment';

const Graph = () => {

  const [countData, setCountData] = useState([]);
  const [shouldLoadGraph, setshouldLoadGraph] = useState(false);


  const getDayWisePositiveNewsCount_fetch = (startDate, endDate, month, year) => {

    const promiseItems = fetch('api/getdaywiseposnewscount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ startdate: startDate, enddate: endDate, month: month, year: year })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });

    return promiseItems;
  }


  const getDayWiseCO2Emission_fetch = (startDate, endDate, month, year) => {
    let filterData = co2EmissionData.filter(function (el) {
      return el.year == parseInt(year) && el.month == parseInt(month)
        && el.day >= parseInt(startDate) && el.day <= parseInt(endDate);
    })
    // console.log(filterData);
    generateCO2EmissionData(filterData);
    return filterData;
  }

  const getDayWiseCurrencyRate_fetch = (startDate, endDate, month, year) => {
    let formattedStartDate = startDate+"-"+month+"-"+year;
    let formattedEndDate = endDate+"-"+month+"-"+year;

    let filterData = worldCurrency.filter(function (el) {
      return moment(el.Date,"DD-MM-YYYY").valueOf() >= moment(formattedStartDate,"DD-MM-YYYY").valueOf() 
      && moment(el.Date,"DD-MM-YYYY").valueOf() <= moment(formattedEndDate,"DD-MM-YYYY").valueOf();
    })
    console.log(filterData);
    return filterData;
  }


  const getDayWisePNCount = (startDate, endDate, month, year) => {
    let data = [];
    getDayWisePositiveNewsCount_fetch(startDate, endDate, month, year)
      .then(newItems => {
        if (newItems['details'].length > 0) {
          console.log(newItems);
          let oldCountData = countData;

          newItems['details'].forEach(element => {

            let eachelem = {
              "date": parseInt((element._id.toString()).substring(6, 8)),
              "count": element.count
            }
            data.push(eachelem);
          });
          setCountData(data);
          mergeUniquely(oldCountData, data);
        }
      })
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `Request failed: ${error}`
        })
      );
  }

  const generateCO2EmissionData = (data) => {
    let mData = [];
    data.forEach(element => {
      let eachelem = {
        "date": element.year + "" + element.month.length == 1 ? ("0" + element.month) : (element.month)
          + "" + element.day.length == 1 ? ("0" + element.day) : (element.day),
        "co2": element.trend * 10
      }
      mData.push(eachelem);
    });
    setCountData(mData);
    console.log(mData)
    // setshouldLoadGraph(true);
  }


  const mergeUniquely = (arr1 = [], arr2 = []) => {
          const map = new Map();
          arr1.forEach(item => map.set(item.date, item));
          arr2.forEach(item => map.set(item.date, { ...map.get(item.date), ...item }));
          const mergedArr = Array.from(map.values());

          setCountData(mergedArr);
          
          setshouldLoadGraph(true);
  };



  React.useEffect(() => {
    getDayWiseCO2Emission_fetch("01", "31", "03", "2022");
    // getDayWiseCurrencyRate_fetch("01", "31", "03", "2022");
    // generateCO2EmissionData(data);
    getDayWisePNCount("01", "31", "03", "2022");
  }, [shouldLoadGraph]);



  return (
    <main id="mainContent" className="container">
      <h3 className="tc py-5">Daily Good News count vs Daily CO2 Emission</h3>
      {
      // shouldLoadGraph?(
      countData.length > 0 ? (<StackedBarChart countData={countData} />) : (null)
      // ):(
        // <h2>Loading . . .</h2>
      // )
      }
    </main>
  );
};

export default Graph;
