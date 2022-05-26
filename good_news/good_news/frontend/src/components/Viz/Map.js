import React from "react";
import Chart from "./Chart";

const Map = () => {
  const firstChart = "627bb31b-088b-4ee2-8f11-6bca471181a4";
  const secondChart = "628524fb-fbf5-47e8-857a-8e1b25b0dcee";
  const firstBar = "6287950c-dbec-4730-837e-5fad19253eaa";
  const secondBar = "62878e9a-effe-4964-8f88-7d4ef261af9e";
  const firstPie = "6287a06e-f5f9-4bd0-8823-4c1ea748a2c4";

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <Chart chartId={firstChart} />
        <Chart chartId={secondChart} />
        <Chart chartId={firstBar} />
        <Chart chartId={firstPie} />
        <Chart chartId={secondBar} />
      </div>
    </main>
  );
};

export default Map;
