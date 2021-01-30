<template>
  <div class="traffic-light">
    <lamp 
      v-for="(light, index) of signal" v-bind:key="index"
      :color="light.color"
      :isActive="routeColor === light.color"
      :timer='timer'
    >
    </lamp>
  </div>
</template>

<script>
  import Lamp from './Lamp.vue';

  const KEY_OF_LOCAL_STORAGE = 'stateOfTrafficLight';
  const NUMBER_OF_MILLISECOND_PER_SECOND = 1000;
  const DECREMENT_OF_TIMER = 1;
  const VALUE_STOP_TIMER = 0;
  const INDEX_OF_NOT_FOUND_MATCH = -1;

  export default {
    name: 'TrafficLight',
    components: {
      Lamp
    },
    data() {
      return {
        timer: 0,
        indexOfSignal: 0,
        nextIndexOfSignal: 1,
        increment: 1,
        timerID: 0
      }
    },
    props: ['routeColor', 'signal'],
    watch: {
      timer: function() {
        const state = {
          timer: this.timer,
          indexOfSignal: this.indexOfSignal,
          nextIndexOfSignal: this.nextIndexOfSignal,
          increment: this.increment
        };

        sessionStorage.setItem(KEY_OF_LOCAL_STORAGE, JSON.stringify(state));

        if (this.timer === VALUE_STOP_TIMER) {
          clearInterval(this.timerID);
          this.updateState(this.nextIndexOfSignal);
          this.switchSignal(this.indexOfSignal);
          this.startTimer();
        }
      }
    },
    methods: {
      startApp() {
        const index = this.signal.findIndex(item => item.color === this.routeColor);

        this.initState(index);
        this.switchSignal(this.indexOfSignal);
        this.startTimer();
      },
      switchSignal(nextIndexOfSignal) {

        if (this.signal[nextIndexOfSignal].color !== this.routeColor) {
          this.$router.push(this.signal[nextIndexOfSignal].color);
        }
        
      },
      initState(index) {
        const lastState = JSON.parse( sessionStorage.getItem(KEY_OF_LOCAL_STORAGE) );

        if (index === INDEX_OF_NOT_FOUND_MATCH) {
          this.timer = this.signal[this.indexOfSignal].timer;
          return;
        }

        if (lastState) {

          if (index === lastState.indexOfSignal) {
            this.increment = lastState.increment;
            this.timer = lastState.timer;
            this.indexOfSignal = lastState.indexOfSignal;
            this.nextIndexOfSignal = lastState.nextIndexOfSignal;
            return;
          }

        }

        this.updateState(index);
      },
      updateState(index) {
        const isIncrementPositive = this.increment > 0;
        const isFirstIndex = index === 0;
        const isLastIndex = index === this.signal.length - 1;

        if ( (isLastIndex && isIncrementPositive) || (isFirstIndex && !isIncrementPositive) ) {
          this.increment = -this.increment;
        }

        this.indexOfSignal = index;
        this.nextIndexOfSignal = index + this.increment;
        this.timer = this.signal[index].timer;

      },
      startTimer() {
        this.timerID = setInterval(() => {
          this.timer -= DECREMENT_OF_TIMER;
        }, NUMBER_OF_MILLISECOND_PER_SECOND)
      }
    },
    mounted() {
      this.startApp();
    },
    beforeDestroy() {
      clearInterval(this.timerID);
    }
  }
</script>

<style scoped>
  .traffic-light {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 550px;
    padding: 30px;
    background-color: #000;
    border-radius: 70px;
  }

  .route {
    color: #fff;
  }

</style>