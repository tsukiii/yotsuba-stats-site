<template>
  <div id="app">
    <app-navbar></app-navbar>
    <keep-alive>
      <router-view />
    </keep-alive>
    <app-footer></app-footer>
  </div>
</template>

<script>
import navbar from './components/navbar';
import info from './components/info';
import chart from './components/chart';
import boardsTable from './components/boardsTable';
import footer from './components/footer';

export default {

  name: 'App',

  components: {
    appNavbar: navbar,
    appFooter: footer,
    appChart: chart,
    appBoardsTable: boardsTable,
    appInfo: info,
  },
};
</script>

<style lang="scss">
@import './css/variables.scss';

#app {
  font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  color: $--color-body-text;
}
body{
  margin: 0;
  padding: 0;
}
</style>
