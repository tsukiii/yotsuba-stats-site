<template>
  <div class="info-container">
    <div class="info-navbar">Info</div>
    <div class="time-display">Today is {{ dateMessage }}<br>
      Current time is now {{ timeMessage}}</div>
    <div class="time-since">It's been {{ timeSinceStart }} since the project has started.</div><br>
    <div class="users-connected">There are currently {{userCount}} users connected.</div>
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
  },
  mounted() {
    apiSocket.socket.on('usersCount', (total) => {
      this.userCount = total;
    });
    this.dateMessage = moment().format('MMMM Do YYYY, dddd');
    this.timeMessage = moment().format('h:mm:ss a');
    this.timeSinceStart = moment('20180611', 'YYYYMMDD').fromNow();
  },
};
</script>

<style lang="scss" scoped>
@import '../css/variables';

.info-navbar{
  background-color: $--color-navbar;
  color: $--color-navbar-text;
  font-weight: bold;
}
</style>
