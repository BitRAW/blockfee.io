const timeFrameMap = {
    "6h": { format: "h", duration: 6, sample: "10m" },
    "24h": { format: "d", duration: 1, sample: "2h" },
    "7d": { format: "d", duration: 7, sample: "12h" },
    "30d": { format: "d", duration: 30, sample: "2d" },
    "1y": { format: "y", duration: 1, sample: "1M" },
    "all": { format: "y", duration: 999, sample: "1M" },
  };

  export {timeFrameMap}