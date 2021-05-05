<script lang="ts">
  import { calculateBlockSubsidyRatio } from "../../API/BTCAPI";
  import ChartTemplate from "./ChartTemplate.svelte";

  const tables = ["total_fee", "blocks"];
  const lines = ["subsidy"];
  const labelsMap = {
    subsidy: "Subsidy",
  };
  const colorMap = {
    subsidy: "rgba(75, 192, 192, 1)",
  };

  const chartId = "subsidy-chart";

  const chartUnit = "%";

  const chartTitle = "Subsidy";
  const popupInfo =
    "shows the percentage of rewards coming from block subsidies.";

  function dataManipulationFunction(data) {
    let newData = data.map((element) => {
      return [
        element[0],
        calculateBlockSubsidyRatio(element[2], element[1]) * 100,
      ];
    });
    return newData;
  }

  const isFill = true;
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
