<template>
  <div class="chart-container">

    <div class="chart-container-header">
      <div class="header-text">Hourly post rate</div>
    </div>

    <div class="chart-wrapper">
      <canvas id="statsChart" />
    </div>

    <div class="chart-board-buttons">
      <div v-for="board in boards" :key="board.element"
        class="board-buttons"
        @click="selectBoard(board)">

        <div :class="{'button-selected': selectedBoards.includes(board)}"
          class="board-button">
          /{{ board }}/
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import apiSocket from '../js/socket';
import config from '../js/config';
import eventBus from '../js/eventBus';

const chartFunctions = require('../js/chart');

export default {

  data: () => ({
    boards: config.boardsList,
    selectedBoards: [],
    history,
    maxEntries: 7, // 7 days
  }),
  methods: {
    selectBoard(board) {
      if (this.selectedBoards.includes(board)) {
        const idx = this.selectedBoards.indexOf(board);
        chartFunctions.removeBoard(board);
        this.selectedBoards.splice(idx, 1);
      } else {
        this.selectedBoards.push(board);
        this.insertBoardData(board);
      }
    },
    insertBoardData(board) {
      /* eslint-disable */

      let boardData = [];
      for (let i = 0; i < this.history.length; i++) {
        let date = Object.values(this.history[i]._id);
        let hour = date.splice(3, 1);
        
        boardData.push(
          {
             x: new Date(date).setHours(hour),
             y: this.history[i][`${board}`].toFixed(2),
          }
        );
        
      }
      chartFunctions.insertBoard(board, boardData);
    },
    updateData() {
     
    },
  },
  mounted() {
    chartFunctions.initChart('statsChart');

    apiSocket.socket.emit('requestHistory', 'request');
    console.log('Requesting history');

    apiSocket.socket.on('history', (data) => {
      
      this.history = data;
      eventBus.$emit('history-update', this.history);

    });
  },
};

</script>

<style lang="scss" scoped>
@import '../css/variables.scss';

.chart-container {
  padding: 0 0 1em 0;
  height: auto;
}

.chart-container-header {
  background-color: $--color-navbar;
  line-height: 2em;
  >.header-text{
    color: #ffffff;
  }
}

.chart-board-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0rem 2rem 0rem 2rem ;
  align-content: center;
  width: 100%;
}
.board-buttons {
  display: flex;
  position: relative;
  border: none;
  
  >.board-button {
    border: 1px solid;
    justify-content: center;
    color: #000000;
    width: 4rem;
    margin: 0.1rem 0.5rem 0.1rem 0.5rem;
    transition: all 0.5s ease-out;
    &.button-selected {
      font-weight: bold;
      color: #ffffff;
      background-color: #74b816;
      border: none;
    }
  }
}

.button-selected:after {
  content: "";
  transform: translateY(0px) !important;
}

</style>
