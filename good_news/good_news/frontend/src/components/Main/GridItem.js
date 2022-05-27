import React from "react";
import PropTypes from "prop-types";
// import { LinkPreview } from '@dhaiwat10/react-link-preview';
import "./GridItem.css";

const GridItem = ({ item }) => {
  let {title, description, image, site_name, type,id} = item;
  let descCharLimit = 50;
  let titleCharLimit = 100;
  let placeHolderImageLink = "https://via.placeholder.com/150?text=Image+Not+Found";
  return (
    <div className="col-md-4 col-sm-12 p-5" id={id}>
      <a href={item} style={{"textDecoration":"none"}} target="_blank">
      <div className ="card">
        <img className ="card-img-top"
           width="100%" 
           height="180"  
           src={image==null||""?placeHolderImageLink:image} 
          //  onError={e => { e.currentTarget.src = {placeHolderImageLink}; }}
        />
        <div className ="card-body">
        <h5 className ="card-title">{title && title.length>titleCharLimit?title.substring(0,titleCharLimit)+"...":title}</h5>
        {/* <p className ="card-text">
          {description && description.length>descCharLimit?description.substring(0,descCharLimit)+"...":description}
        </p> */}
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