<template>
  <div id="index">
    <div class="main-container">
      <app-info></app-info>
      <app-chart></app-chart>
      <app-boards-table></app-boards-table>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar';
import info from '@/components/info';
import chart from '@/components/chart';
import boardsTable from '@/components/boardsTable';
import footer from '@/components/footer';

export default {

  components: {
    appNavbar: navbar,
    appFooter: footer,
    appChart: chart,
    appBoardsTable: boardsTable,
    appInfo: info,
  },
};
</script>

<style lang="scss" scoped>
  @import '../css/variables.scss';

  .main-container {
    display: grid;
    position: relative;
    grid-template-columns:1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: "info . . "
                         "chart chart boardsTable"
                         ". . boardsTable";
    grid-row-gap: 1em;
    grid-column-gap: 3em;
    padding: 1em;
    background-color: $--body-background-color;
  }

  .navbar-container {
    grid-area: navbar;
  }

  .info-container {
    grid-area: info;
    box-shadow: $--box-shadow-values;
    background-color: $--color-box-background-color;
  }
  .chart-container {
    grid-area: chart;
    box-shadow: $--box-shadow-values;
    background-color: $--color-box-background-color;
  }
  .table-container {
    grid-area: boardsTable;
    box-shadow: $--box-shadow-values;
    background-color: $--color-box-background-color;
  }
  .footer-container {
    grid-area: footer;
  }

</style>
