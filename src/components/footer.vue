<template>
  <div class="footer-container">
    <p>All the information gathered are from <a href="https://4chan.org">4chan.</a><br>
    This website communicates with the <a href="https://github.com/4chan/4chan-API">4chan-API</a> to gather data.</p>
    <p>Yotsuba Stats {{new Date().getFullYear()}}</p>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
@import "../css/variables.scss";

  .footer-container{
    padding: 0 0 0 1em;
    text-align: left;
    background-color: $--color-navbar;
    color: $--color-navbar-text;
  }
</style>

