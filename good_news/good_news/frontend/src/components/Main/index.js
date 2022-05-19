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

  const getCountrywiseNews_fetch = (countryCode) => {
    console.log(countryCode);
    fetch("/api/getCountrywiseNews", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ countryCode: countryCode, pageno: pageCount })
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
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

  const handleChange = (e) => {
    if (e.target.value != "ALL") {
      setMode("COUNTRY");
      setCountryCode(e.target.value);
      collectCountrywiseNewsItems(e.target.value);
    } else {
      collectNewsItems();
    }
  }
 

  const collectCountrywiseNewsItems = (countryId) => {
    getCountrywiseNews_fetch(countryId)
      .then(newItems => {
        if (newItems['details'].length > 0) {
          setUniqueNews(newItems['details'], countryId == country ? news : []);
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
      collectCountrywiseNewsItems(country)
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
        <label><strong>Select Country:</strong>  &nbsp;</label>
        <select className="form-select" name="countryCode" id="countryCode" onChange={handleChange}>
          <option selected value="ALL">Select Country</option>
          {countryData.map((eachcountryDetails, i) => (
            <option value={eachcountryDetails.value} key={eachcountryDetails.value}>{eachcountryDetails.label}</option>
          ))}
        </select>
        <div className="row justify-content-around text-center pb-5">
          {news.map(item => (
            <GridItem
              key={item}
              item={item}
            />
          ))}
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