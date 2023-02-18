import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import "../App.css";
const BarChart = () => {
  const sortedData = [];
  const select = useSelector((state) => state.products.products.slice());

  select.sort((a, b) => {
    return b.view - a.view;
  });

  let index = 0;
  select.forEach(({ productName, view }) => {
    index++;
    if (index > 5) {
      return;
    }
    sortedData.push({ productName, view });
  });


  const chart = {
    labels: sortedData.map(({ productName }) => productName),
    datasets: [
      {
        label: "most view data",
        data: sortedData.map(({ view }) => view),
        backgroundColor: [
          "rgba(255,99,132,.6)",
          "rgba(255,159,64,.6)",
          "rgba(255,205,86,.6)",
          "rgba(75,192,192,.6)",
          "rgba(54, 162,235,.6)",
        ],
        borderColor: [
          "rgba(255,99,132)",
          "rgba(255,159,64)",
          "rgba(255,205,86)",
          "rgba(75,192,192)",
          "rgba(54, 162,235)",
        ],
        borderWidth: 2.4,
        borderRadius: 4
      },
    ],
  };


  return (
    <div>
      <Container>
        <Box
          sx={{ marginTop: "40px", marginBottom: "10px", textAlign: "center" }}
        >
          <Typography variant="h4">Most View Products - Top 5</Typography>
        </Box>

        <Box sx={{ width: "calc(100% - 100px)", height: "60vh" }}>
          <Bar className="bar" data={chart} />
        </Box>
      </Container>
    </div>
  );
};

export default BarChart;
