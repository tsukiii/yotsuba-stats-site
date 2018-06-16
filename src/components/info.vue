<template>
  <div class="info-container">
    <div class="info-navbar">Info</div>
    <div class="info-content">
      <div class="heading">Date: <br></div>
      <div>{{ dateMessage }}</div>
      <hr>
      <div class="heading">Time:<br> </div>
      <div>{{ timeMessage}}</div><hr>
      <div class="heading">Started: <br></div>
      <div>{{ timeSinceStart }}</div><hr>
      <div class="heading">Visitors online: </div>
      <div>{{userCount}}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import apiSocket from '../js/socket';

export default {
  data: () => ({
    userCount: 0,
    dateMessage: '',
    timeMessage: '',
    timeSinceStart: '',
  }),
  methods: {
    updateTime() {
      this.timeMessage = moment().format('h:mm:ss a');
      this.dateMessage = moment().format('MMMM Do YYYY, dddd');
      this.timeSinceStart = moment('20180611', 'YYYYMMDD').fromNow();
    },
  },
  mounted() {
    apiSocket.socket.on('usersCount', (total) => {
      this.userCount = total;
    });
    setInterval(this.updateTime, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import '../css/variables';

.info-container{
  // display: flex;
  // flex-direction: column;
  min-width: 0;
}
.info-navbar{
  background-color: $--color-navbar;
  color: $--color-navbar-text;
  font-weight: bold;
  line-height: 2em;
}
.info-content{
  text-align: left;
  padding: 1em;
  >.heading{
    font-weight: bold;
  }
}
hr{
  width: 20%;
  margin-left: 0;
}
</style>
