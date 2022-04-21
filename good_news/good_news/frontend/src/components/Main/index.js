import React, { useState } from "react";
import WarningMessage from "../WarningMessage/WarningMessage";
import GridItem from "./GridItem";
// import SearchBar from "./SearchBar";
import { ENDPOINT } from "../../constants";

const Grid = () => {
  const [news, setNews] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});


  const getNewsItems = () => {
    const promiseItems = fetch(ENDPOINT.NEWS+'/'+pageCount)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });

    return promiseItems;
  }

  const collectNewsItems = () => {
    getNewsItems()
    .then(newItems => {
      if(newItems['details'].length>0){
        const uniqueNews = [];
        newItems['details'].forEach((t) => !uniqueNews.includes(t.SourceURL) && uniqueNews.push(t.SourceURL));
        console.log("uniqueNews")
        console.log(uniqueNews.length)
        let totalUniqueNews = [...news,...uniqueNews]
        setNews(totalUniqueNews)
        console.log("uniqueNews length after")
        console.log(uniqueNews.length)
      }      
    })
    .catch(error =>
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: `Request failed: ${error}`
      })
    );
    
  }

  // window.addEventListener("scroll", () => { 
    
  //   if(scrollY==4000){
  //   }
  // })

  function onScroll() {    
    if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        console.log('Reached bottom')
        // collectNewsItems();
        setIsFetching(true);
        setPageCount(pageCount+1)
    }
  }

  React.useEffect(() => {
    collectNewsItems();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);  
  }, [isFetching,pageCount]);

  // const addItem = (textField) => {
  //   // Warning Pop Up if the user submits an empty message
  //   if (!textField) {
  //     setWarningMessage({
  //       warningMessageOpen: true,
  //       warningMessageText: ERROR_MESSAGE.LIST_EMPTY_MESSAGE
  //     });
  //     return;
  //   }

  //   fetch(ENDPOINT.LIST, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       text: textField
  //     })
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then(itemAdded =>{
  //       setItems([itemAdded, ...items]);
  //     })
  //     .catch(error =>
  //       setWarningMessage({
  //         warningMessageOpen: true,
  //         warningMessageText: `${ERROR_MESSAGE.LIST_ADD} ${error}`
  //       })
  //     );
  // };

  return (
    <main id="mainContent">
      <div className="container">
        <div className="row justify-content-center mt-5 p-0">
          <h3>Find out <span style={{"color":"#116149","fontSize":"42px"}}>positive</span> news from around the globe 🌎</h3>          
        </div>
        <div className="row justify-content-center">
        <h6>Scroll to bottom &#11015; to find out more news</h6>
        </div>
        <br/><br/>
        {/* <SearchBar addItem={addItem}/> */}
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

export default Grid;