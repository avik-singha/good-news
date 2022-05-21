import React from "react";
import PropTypes from "prop-types";
// import { LinkPreview } from '@dhaiwat10/react-link-preview';
import "./GridItem.css";

const GridItem = ({ item }) => {
  let dummyItem = {
          "site_name": "PressTV",
          "title": "Spain’s spy chief sacked over Pegasus spyware scandal",
          "type": "video",
          "description": "Spain has fired the director of its top intelligence agency over the hacking of politicians’ mobile phones with the Israeli spyware Pegasus.",
          "image": "https://cdn.presstv.ir/Photo/2022/5/10/0f3061fe-2da5-4a99-8b7f-09e1cd980ee0.jpeg"  
  };
  item=dummyItem;

  let {title, description, image, site_name, type} = item;
  let descCharLimit = 50;
  
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <a href={item} style={{"textDecoration":"none"}} target="_blank">
      <div className ="card">
        <img className ="card-img-top" width="100%" height="180"  src={image} />
        <div className ="card-body">
        <h5 className ="card-title">{title}</h5>
          <p className ="card-text">
           {description.length>descCharLimit?description.substring(0,100)+"...":description}
          </p>
        </div>
      </div>
      </a>
    </div>
  );
}

GridItem.propTypes = {
  item: PropTypes.any
}

export default GridItem;


{/* <LinkPreview 
url={item} 
width='300px' 
height='400px'
openInNewTab={true}
showPlaceholderIfNoImage={true}
descriptionLength={50}
showLoader={true}
/> */}