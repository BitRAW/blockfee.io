import dateFormat from "dateformat";

const getLineChartOptions = function(labelLength) {
  let opt = { scales: {
    y: {
      borderColor: "rgba(228, 228, 231,.2)",
      grid: {
        color: "rgba(228, 228, 231,.2)",
      },
      // max: 100,
      // min: 0,
    },
    x: {
      borderColor: "rgba(228, 228, 231,.2)",
      grid: {
        color: "rgba(228, 228, 231,.2)",
      },
      ticks: {
        callback: function (index, val) {
          const labelSpace = +(labelLength / 4).toFixed(0);

          if (index % labelSpace === 0) {
            return this.getLabelForValue(val);
          } else return null;
        },
      },
    },
  },
}
}
export {getLineChartOptions}