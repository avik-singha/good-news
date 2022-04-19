import React, { useState } from "react";
import WarningMessage from "../WarningMessage/WarningMessage";
import GridItem from "./GridItem";
import SearchBar from "./SearchBar";
import { ERROR_MESSAGE, ENDPOINT } from "../../constants";

const Grid = () => {
  const [items, setItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});

  // const getItems = () => {
  //   const promiseItems = fetch(ENDPOINT.GRID)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw Error(response.statusText);
  //     }
  //     return response.json();
  //   });

  //   return promiseItems;
  // }

  const getNewsItems = () => {
    const promiseItems = fetch(ENDPOINT.NEWS)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });

    return promiseItems;
  }

  const closeWarningMessage = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  }

  React.useEffect(() => {
    getNewsItems()
    .then(newItems => {
      if(newItems['details'].length>0){
        const uniqueNews = [];
        newItems['details'].forEach((t) => !uniqueNews.includes(t.SourceURL) && uniqueNews.push(t.SourceURL));
        console.log("uniqueNews")
        console.log(uniqueNews)

        setItems(uniqueNews)
      }      
    })
    .catch(error =>
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: `Request to get grid text failed: ${error}`
      })
    );
  }, []);

  const addItem = (textField) => {
    // Warning Pop Up if the user submits an empty message
    if (!textField) {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: ERROR_MESSAGE.LIST_EMPTY_MESSAGE
      });
      return;
    }

    fetch(ENDPOINT.LIST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: textField
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(itemAdded =>{
        setItems([itemAdded, ...items]);
      })
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${ERROR_MESSAGE.LIST_ADD} ${error}`
        })
      );
  };

  return (
    <main id="mainContent">

      <div className="container">
        <div className="row justify-content-center mt-5 p-0">
          <h3>Here are some good news around the world </h3>
        </div>
        <br/><br/>
        <SearchBar addItem={addItem}/>
        <div className="row justify-content-around text-center pb-5">
          {items.map(item => (
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
        onWarningClose={closeWarningMessage}
      />
    </main>
  );
}

export default Grid;