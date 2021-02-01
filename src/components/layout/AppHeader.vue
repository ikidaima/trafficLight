<template>
  <header class="header">
    <a href="./">TrafficLight</a>
    <nav>
      <ul class="list">
        <li class="list-item">
          <a href="./red">Red light</a>
        </li>
        <li class="list-item">
          <a href="./yellow">Yellow light</a>
        </li>
        <li class="list-item">
          <a href="./green">Green light</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }

  .list {
    display: flex;
    list-style-type: none;
  }

  .list-item:not(:last-child) {
    margin-right: 20px;
  }
</style>