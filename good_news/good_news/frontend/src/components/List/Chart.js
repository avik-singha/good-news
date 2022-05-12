import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = () => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-gdelt-vdkwv",
  });

  const chartDiv = useRef(null);
  const [chart] = useState(
    sdk.createChart({
      chartId: "627bb31b-088b-4ee2-8f11-6bca471181a4",
      height: window.innerHeight,
      width: window.innerWidth - 50,
    })
  );

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, []);

  return <div className="chart" ref={chartDiv} />;
};

export default Chart;
