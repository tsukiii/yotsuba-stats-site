<template>
  <div class="info-container">
    <div class="info-navbar">Info</div>
    <div class="users-connected">There are currently {{userCount}} users connected.</div>
  </div>
</template>

<script>

import apiSocket from '../js/socket';

export default {
  data: () => ({
    userCount: 0,
  }),
  methods: {
  },
  mounted() {
    apiSocket.socket.on('usersCount', (total) => {
      this.userCount = total;
    });
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
