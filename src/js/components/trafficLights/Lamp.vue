<template>
  <div 
    class="lamp"
    :class="[
      'lamp--' + color,
      isActive ? 'active' : '',
      timer < 3 && isActive ? 'splash' : ''
    ]"
  >
  <p v-if="isActive">{{timer}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Lamp',
    props: ['color', 'isActive', 'timer']
  }
</script>

<style scoped>
  .lamp {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    color: #000;
    font-size: 42px;
    font-family: sans-serif;
    border-radius: 50%;
    opacity: 0.3;
  }

  .lamp--red {
    background-color: #f00;
  }

  .lamp--yellow {
    background-color: #ff0;
  }

  .lamp--green {
    background-color: #0f0;
  }

  .active {
    opacity: 1;
  }

  .active.lamp--red {
    box-shadow: 0 0 30px 20px#f00;
  }

  .active.lamp--yellow {
    box-shadow: 0 0 30px 20px#ff0;
  }

  .active.lamp--green {
    box-shadow: 0 0 30px 20px#0f0;
  }

  .splash {
    animation: splash 1s linear infinite;
  }

  @keyframes splash {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0.3;
    }

    to {
      opacity: 1;
    }
  }

</style>