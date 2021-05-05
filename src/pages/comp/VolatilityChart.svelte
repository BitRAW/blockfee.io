<script lang="ts">
  import { getStandardDeviation } from "../../API/VolatilityAPI";
  import ChartTemplate from "./ChartTemplate.svelte";

  const tables = ["median_fee"];
  const lines = ["volatility"];
  const labelsMap = {
    volatility: "Volatility",
  };
  const colorMap = {
    volatility: "rgba(75, 192, 192, 1)",
  };

  const chartId = "volatility-chart";

  const chartUnit = "sat/vB";

  const chartTitle = "Volatility";
  const popupInfo = "Shows the Median Fee Volatility over time.";

  function dataManipulationFunction(data) {
    let lookback = +(data.length / 4).toFixed(0);
    let c = 0;
    let removeFirstElements = 0;
    let newData = data.map((element) => {
      if (c >= lookback) {
        let lookbackSet = data.slice(c - lookback, c);
        lookbackSet = lookbackSet.map((val) => {
          return val[1];
        });
        c++;
        return [element[0], getStandardDeviation(lookbackSet)];
      } else {
        removeFirstElements++;
      }
      c++;
    });
    newData.splice(0, removeFirstElements);

    return newData;
  }

  const isFill = false;
</script>

<ChartTemplate
  {tables}
  {lines}
  {labelsMap}
  {colorMap}
  {chartId}
  {chartUnit}
  {chartTitle}
  {popupInfo}
  {isFill}
  {dataManipulationFunction}
/>
