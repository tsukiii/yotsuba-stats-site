window.moment = require('moment');
const Chart = require('chart.js');

let chart;
// let boardsEnabled = [];

// last 7 days only

const initChart = (id) => {
  chart = new Chart(id, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      datasets: [],
    },
    // Configuration options go here
    options: {
      responsive: true,
      hover: {
        animationDuration: 500,
        mode: 'nearest',
        axis: 'xy',
      },
      legend: {
        labels: {
          fontColor: '#000000',
        },
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              hour: 'h A',
              day: 'MMM D hA',
            },
          },
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
          },
        }],
      },
    },
  });
  return chart;
};

const insertNewData = data => data;

/* eslint-disable */
const insertBoard = (board, boardData) => {
  console.log('Inserting data');
  // generate random hex color
  let color = '#' + Math.floor(Math.random()*16777215).toString(16);
  
  chart.data.datasets.push({
    label: board,
    data: boardData,
    backgroundColor: color,
    borderColor: color,
    fill: false,
  });
  chart.update(0);
};
const updateChart = () => {

};
const removeBoard = (board) => {
  const index = chart.data.datasets.findIndex(data => data.label === board);
  if (index != -1) {
    chart.data.datasets.splice(index, 1);
    chart.update();
  }

}

module.exports = {
  initChart,
  insertNewData,
  insertBoard,
  updateChart,
  removeBoard,
};
