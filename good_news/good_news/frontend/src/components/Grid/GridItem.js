import React from "react";
// import ImgGreyBox from "../../images/GreyBox.svg"
import PropTypes from "prop-types";
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const GridItem = ({ item }) => {
  return (
    <div className="col-md-4 col-sm-12 p-5">
      {/* <img src={ImgGreyBox} alt="Default Grey Box" className="mb-3" /> */}
      {/* <h3>{item.header}</h3> */}
      {/* <a href={item}>{item}</a> */}
      <LinkPreview 
        url={item} 
        width='300px' 
        height='400px'
        openInNewTab={true}
        showPlaceholderIfNoImage={true}
        descriptionLength={50}
        showLoader={true}
      />
    </div>
  );
}

GridItem.propTypes = {
  item: PropTypes.any
}

export default GridItem;