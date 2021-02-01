<template>
  <div
    id="app"
    class="app"
  >
    <TheHeader />
    <main class="main">
      <router-view :signal="signal" />
    </main>
  </div>
</template>

<script>
  import TheHeader from './components/layout/AppHeader.vue';

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

    components: {
      TheHeader
    },

    data() {
      return {
        signal: SIGNAL
      }
    }
  }
</script>

<style scoped>
  .app {
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  .main{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>