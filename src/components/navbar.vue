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
  padding: 0.25em 1em 0.25em 1em;
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  color: $--color-navbar-text;

}
a{
  >.navbar-link{
    font-size: 1.5rem;
    position: relative;
    color: #ffffff;
    >&.title{
      padding: 0 1em 0 0;
    }
    >&.about{
      padding: 0 0 0 1em;
    }
  }
}

</style>
