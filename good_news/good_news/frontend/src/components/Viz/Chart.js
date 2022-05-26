import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

// eslint-disable-next-line react/prop-types
const Chart = ({ chartId }) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-gdelt-vdkwv",
  });

  const chartDiv = useRef(null);
  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      height: window.innerHeight,
      width: window.innerWidth - 50,
    })
  );

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  return <div className="chart" ref={chartDiv} />;
};

export default Chart;
