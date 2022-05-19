import React from "react";
import Chart from "./Chart";

const Map = () => {
  // const chartId = "627bb31b-088b-4ee2-8f11-6bca471181a4";
  // chartId={chartId} height={1000} width={500}

  const firstChart = "627bb31b-088b-4ee2-8f11-6bca471181a4";
  const secondChart = "628524fb-fbf5-47e8-857a-8e1b25b0dcee";

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <Chart chartId={firstChart} />
        <Chart chartId={secondChart} />
      </div>
    </main>
  );
};

export default Map;
