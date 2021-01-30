<template>
  <div class="app" id="app">
    <router-view :signal="signal"></router-view>
  </div>
</template>

<script>
  const SIGNAL = [
    {
      color: 'red',
      timer: 10
    },
      {
      color: 'yellow',
      timer: 3
    },
      {
      color: 'green',
      timer: 15
    },
  ];

  export default {
    name: 'App',
    data() {
      return {
        signal: SIGNAL
      }
    }
  }
</script>

<style scoped>
  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
</style>