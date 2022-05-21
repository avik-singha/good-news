import React from "react";
import PropTypes from "prop-types";
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const GridItem = ({ item }) => {
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <LinkPreview 
        url={item} 
        width='300px' 
        height='400px'
        openInNewTab={true}
        showPlaceholderIfNoImage={true}
        descriptionLength={50}
        showLoader={true}
      />

    {/* <div className="card" style="width: 18rem;">
      <img className="card-img-top" src="..." alt="Card image cap"/>
      <div className="card-body">
        <p className="card-text">{item}</p>
      </div>
    </div> */}
    </div>
  );
}

GridItem.propTypes = {
  item: PropTypes.any
}

export default GridItem;