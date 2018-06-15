<template>
  <div class="navbar">
    <div class="navbar-container">
      <router-link to="/">
        <div class="navbar-link title">Yotsuba Stats</div>
      </router-link>
      <!-- <div class="spacer"></div> -->
      <router-link to="/about">
        <div class="navbar-link about">About</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
@import "../css/variables.scss";

.navbar {
  position: relative;
  background-color: $--color-navbar;
  z-index: 99;
  height: 3rem;
  margin: 0;
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  color: $--color-navbar-text;
}

.navbar-link,
.spacer {
  font-size: 1.5rem;
  color: #ffffff;
  position: relative;
}

</style>
