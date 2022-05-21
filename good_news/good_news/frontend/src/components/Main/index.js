import React, { useState } from "react";
import WarningMessage from "../WarningMessage/WarningMessage";
import GridItem from "./GridItem";
import { countryData } from "./countryList";

const NewsPortal = () => {
  const [news, setNews] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [avgTone, setAvgTone] = useState(1);
  const [gsScale, setGsScale] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [warningMessage, setWarningMessage] = useState({ warningMessageOpen: false, warningMessageText: "" });
  const [country, setCountryCode] = useState("");
  const [mode, setMode] = useState("DEFAULT");
  const [year, setYear] = useState("");

  let yearData = [];
  for (var i = 2000; i < (new Date()).getFullYear() + 1; i++) {
    yearData.push(i);
  }



  const getNewsItems_fetch = () => {
    const promiseItems = fetch('api/getnews/' + pageCount)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });

    return promiseItems;
  }
  
  const getRandomNewsItems_fetch = () => {
    const promiseItems = fetch('api/getrandomnews')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });

    return promiseItems;
  }

  const getCountrywiseNews_fetch = (countryCode,yearVal) => {
    console.log(countryCode,yearVal);
    const promiseItems = fetch("/api/getCountrywiseNews", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ countryCode: countryCode, pageno: pageCount, year: yearVal })
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
      return promiseItems;
  }

  const getCountryWiseNewsCount_fetch = () => {
    const promiseItems = fetch('api/getcountrywisenewscount')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });

    return promiseItems;
  }
  
  const getProgressiveNewsItems_fetch = (avgTone, gsScale) => {

    const params = {
      avgtone: avgTone,
      gsscale: gsScale
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(params)
    };
    const promiseItems = fetch('api/getprogressivenews', options)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });

    return promiseItems;
  }

  const setUniqueNews = (newItemsDetails, oldState) => {
    const uniqueNews = [];
    newItemsDetails.forEach((t) => !uniqueNews.includes(t.SourceURL) && uniqueNews.push(t.SourceURL));
    let totalUniqueNews = [...oldState, ...uniqueNews]
    setNews(totalUniqueNews)
  }

  
  React.useEffect(() => {
    collectCountrywiseNewsItems(country, year);
    console.log(country, year);
  }, [country, year]);


  const handleChange = (e) => {

    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (value != "ALL") {
      setMode("COUNTRY");
      name === "countryCode" ? setCountryCode(value) : setYear(value);

    } else {
      collectNewsItems();
    }
  }

  // const handleChange = (e) => {
  //   if (e.target.value != "ALL") {
  //     setMode("COUNTRY");
  //     setCountryCode(e.target.value);
  //     collectCountrywiseNewsItems(e.target.value);
  //   } else {
  //     collectNewsItems();
  //   }
  // }
 

  const collectCountrywiseNewsItems = (countryId,yearVal) => {
    getCountrywiseNews_fetch(countryId,yearVal)
      .then(newItems => {
        if (newItems['details'].length > 0) {
          setUniqueNews(newItems['details'], countryId ? [] : news);
        }
      })
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `Request failed: ${error}`
        })
      );

  }

  const collectNewsItems = () => {
    getNewsItems_fetch()
      .then(newItems => {
        if (newItems['details'].length > 0) {
          setUniqueNews(newItems['details'], mode != "DEFAULT" ? [] : news);
          setMode("DEFAULT");
        }
      })
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `Request failed: ${error}`
        })
      );

  }


  const getRandomNews = () => {
    getRandomNewsItems_fetch()
      .then(newItems => {
        if (newItems['details'].length > 0) {
          setUniqueNews(newItems['details'], []);
        }
      })
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `Request failed: ${error}`
        })
      );
  }

  function onScroll() {
    if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 50) {
      console.log('Reached bottom')
      setIsFetching(true);
      setPageCount(pageCount + 1)
    }
  }

  React.useEffect(() => {
    if (mode == "DEFAULT") {
      collectNewsItems()
    } else if (mode == "COUNTRY") {
      collectCountrywiseNewsItems(country, year)
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isFetching, pageCount]);


  return (
    <main id="mainContent">
      <div className="container">
        <div className="row justify-content-center mt-5 p-0">
          <h3>Find out <span style={{ "color": "#116149", "fontSize": "42px" }}>positive</span> news from around the globe 🌎</h3>
        </div>
        <div className="row justify-content-center">
          <h6>Scroll to bottom &#11015; to find out more news</h6>
        </div>
        <br /><br />
        <div className="row">
          <div className="select">
            <select name="countryCode" id="countryCode" onChange={handleChange}>
              <option defaultValue value="ALL">Select Country</option>
              {countryData.map((eachcountryDetails, i) => (
                <option value={eachcountryDetails.value} key={eachcountryDetails.value}>{eachcountryDetails.label}</option>
              ))}
            </select>
          </div>
          <div>&nbsp;&nbsp;</div>
          <div className="select">
            <select name="year" id="year" onChange={handleChange}>
              <option defaultValue value="ALL">Select Year</option>
              {yearData.map((yearDetails, i) => (
                <option value={yearDetails} key={yearDetails}>{yearDetails}</option>
              ))}
            </select>
          </div>
          <div>&nbsp;&nbsp;</div>
          
          <button type="button" className="btn btn-primary" onClick={()=>getRandomNews()}>Get some random good news</button>
        </div>
        <div className="row justify-content-around text-center pb-5">
          {news.length>0?
          (news.map(item => (

            <GridItem
              key={item}
              item={item}
            />
          ))):
          <h6>No positive news found</h6>
          }
        </div>
      </div>
      <WarningMessage
        open={warningMessage.warningMessageOpen}
        text={warningMessage.warningMessageText}
      />
    </main>
  );
}

export default NewsPortal;