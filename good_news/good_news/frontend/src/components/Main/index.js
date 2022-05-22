import React, { useState } from "react";
import WarningMessage from "../WarningMessage/WarningMessage";
import GridItem from "./GridItem";
import { countryData } from "../../data/countryList";

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
  let startingYear = 2018;
  for (var i = startingYear; i < (new Date()).getFullYear() + 1; i++) {
    yearData.push(i);
  }

  let monthData = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



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

  const setUniqueNews = (newItemsDetails) => {
    const newNews = [];   	

    newItemsDetails.forEach((eachNews) => 
    newNews.push({...eachNews.NewsDetails,...{id : eachNews._id}}
    ))

    // newItemsDetails.forEach((t) => !uniqueNews.includes(t.SourceURL) && uniqueNews.push(t.SourceURL));
    // let totalUniqueNews = [...oldState, ...uniqueNews]
    console.log(newNews)
    let uniqueNewsArray = [...new Map(newNews.map((item) => [item["url"], item])).values()];

    console.log(uniqueNewsArray)
    return uniqueNewsArray;
  }

  const addMoreNews = (newNews,oldNews) =>{
    let totalNews = [...oldNews,...newNews]
    setNews(totalNews);
  }


  
  React.useEffect(() => {
    collectCountrywiseNewsItems(country, year);
    console.log(country, year);
  }, [country, year ]);


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

 
  const collectCountrywiseNewsItems = (countryId,yearVal) => {
    getCountrywiseNews_fetch(countryId,yearVal)
      .then(newItems => {
        if (newItems['details'].length > 0) {
          addMoreNews(setUniqueNews(newItems['details']), countryId ? [] : news);
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
          addMoreNews(setUniqueNews(newItems['details']), mode != "DEFAULT" ? [] : news);
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
          addMoreNews(setUniqueNews(newItems['details']), []);
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
        <div className="row justify-content-center mt-5 p-0 tc">
          <h3>Find out <span style={{ "color": "#116149", "fontSize": "42px" }}>positive</span> news from around the globe 🌎</h3>
        </div>
        <div className="row justify-content-center">
          <h6>Scroll to bottom &#11015; to find out more news</h6>
        </div>
        <br /><br />
        
        <div className="row justify-content-center">
          <div className="select m-1">
            <select name="countryCode" id="countryCode" onChange={handleChange}>
              <option defaultValue value="ALL">Select Country</option>
              {countryData.map((eachcountryDetails, i) => (
                <option value={eachcountryDetails.value} key={eachcountryDetails.value}>{eachcountryDetails.label}</option>
              ))}
            </select>
          </div>
          <div>&nbsp;&nbsp;</div>

          <div className="select m-1">
            <select name="year" id="year" onChange={handleChange}>
              <option defaultValue value="ALL">Select Year</option>
              {yearData.map((yearDetails, i) => (
                <option value={yearDetails} key={yearDetails}>{yearDetails}</option>
              ))}
            </select>
          </div>
          <div>&nbsp;&nbsp;</div>

          {/* <div className="select m-1">
            <select name="month" id="month" onChange={handleChange}>
              <option defaultValue value="ALL">Select Month</option>
              {monthData.map((monthDetails, i) => (
                <option value={monthDetails} key={monthDetails}>{monthDetails}</option>
              ))}
            </select>
          </div>
          <div>&nbsp;&nbsp;</div> */}
          
          {/* <button type="button" className="btn btn-primary" onClick={()=>getRandomNews()}>Get some random good news</button> */}
        </div>
        <div className="row justify-content-around text-center pb-5">
          {news.length>0?
          (news.map(item => (

            <GridItem
              key={item.id}
              item={item}
            />
          ))):
          <h2 style={{"marginTop":"3rem"}}>No positive news found</h2>
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