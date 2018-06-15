<template>
  <div class="info-container">
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

<style scoped>

</style>
