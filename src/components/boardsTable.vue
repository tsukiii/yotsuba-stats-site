<template>
  <div class="table-container">
    <div class="table-header">
      <div v-for="item in [
        {name: 'board', header: 'Board', tooltip:''},
        {name: 'postsPerMinute', header: 'Posts/minute',
          tooltip:'Average posts/min over the last hour'},
        {name: 'activityRate', header: 'Activity Rate',
          tooltip: 'Activity compared to the top PPM rate'},
        ]" :key="item.name" :class="[sortBy === item.name ?
          'category-selected' : '']" :hover-text="item.tooltip"
          class="tooltip-category" @click="sortTableBy(item.name)">
        {{item.header}}</div>
    </div>
    <transition-group>
      <div v-for="board in sortedTable" :key="board" class="table-rows">
        <div :hover-text="boardNames[`${board}`]" class="tooltip-right">/{{board}}/</div>
        <div>{{ history[history.length - 1][`${board}`].toFixed(2) }}</div>
        <div>{{ activityRate[board] }}%</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import config from '../js/config';
import eventBus from '../js/eventBus';

export default {

  data: () => ({
    boardsList: config.boardsList,
    boardNames: config.boardNames,
    history,
    topPPM: [],
    sortBy: 'name',
    activityRate: [],
    sortReversed: true,
  }),
  computed: {
    sortedTable() {
      let boardArray = this.boardsList.slice();
      if (this.sortBy === 'name') {
        boardArray = boardArray.sort();
      } else if (this.sortBy === 'postsPerMinute') {
        boardArray = boardArray.sort((a, b) =>
          this.history[this.history.length - 1][b] - this.history[this.history.length - 1][a]);
      } else if (this.sortBy === 'activityRate') {
        boardArray = boardArray.sort((a, b) => this.activityRate[b] - this.activityRate[a]);
      }
      if (this.sortReversed) boardArray.reverse();
      return boardArray;
    },
  },
  methods: {
    calculateTopPPM(history) {
      this.boardsList.forEach((board) => {
        const highestPPM = this.findMax(history, board);

        if (Object.prototype.hasOwnProperty.call(this.topPPM, board)) {
          if (highestPPM > this.topPPM[`${board}`]) {
            this.topPPM[`${board}`] = highestPPM;
          }
        } else {
          this.topPPM[`${board}`] = highestPPM;
        }
      });
    },
    calculateActivityRatePastHour(history) {
      this.calculateTopPPM(history);
      this.boardsList.forEach((board) => {
        this.activityRate[`${board}`] = ((history[history.length - 1][`${board}`].toFixed(2)
          / this.topPPM[`${board}`]) * 100).toFixed(2);
      });
    },
    findMax(arr, board) {
      return arr.reduce((prev, curr) =>
        (prev[`${board}`] < curr[`${board}`] ? prev[`${board}`] : curr[`${board}`]),
      );
    },
    sortTableBy(category) {
      this.sortBy = category;
      this.sortReversed = !this.sortReversed;
    },
  },

  mounted() {
    eventBus.$on('history-update', (data) => {
      this.history = data;
      this.calculateActivityRatePastHour(this.history);
    });
  },
};
</script>

<style lang="scss" scoped>

@import "../css/variables.scss";
.table-container{
  position: relative;
  width: 100%;
}

.table-header{
  display: flex;
  transition: all 0.5s;
  >div{
    flex: 1;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0px;
      height: 3px;
      width: 100%;
      background: #ffffff;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: transform 0.25s ease;
    }
    &.category-selected::before{
      transform: scaleY(1);
    }
  }
  //justify-content: center;
  position: relative;
  line-height: 2em;
  background-color: $--color-navbar;
  color: $--color-navbar-text;
  font-weight: bold;
}
.table-rows{
  display: flex;
  justify-content: center;
  transition: all 0.5s;
  >div{
    flex: 1;
  }
  &:nth-of-type(2n){
    background-color: $--color-table-second-row;
  }
  &:hover{
    background-color: $--color-table-hover;
    color: #ffffff;
  }
}


[hover-text]:hover::after{
  line-height: 2;
  z-index: 999;
  position: absolute;
  content: attr(hover-text);
  white-space:pre-line;
  padding: 0 1em;
  font-size: 0.75rem;
  background-color: rgba(0,0,0,0.85);
  color: #ffffff;
}

[hover-text].tooltip-category:hover::after{
  left: 0px;
  top: 125%;
}

[hover-text].tooltip-board:hover::after{
    left: 100%;
}
</style>
