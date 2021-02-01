<template>
  <div class="traffic-light">
    <TrafficLightLamp
      v-for="(light, index) of signal" v-bind:key="index"
      :color="light.color"
      :is-active="routeColor === light.color"
      :timer='timer'
    />
  </div>
</template>

<script>
  import TrafficLightLamp from './TrafficLightLamp.vue';

  const KEY_OF_LOCAL_STORAGE = 'stateOfTrafficLight';
  const NUMBER_OF_MILLISECOND_PER_SECOND = 1000;
  const DECREMENT_OF_TIMER = 1;
  const VALUE_STOP_TIMER = 0;
  const INDEX_OF_NOT_FOUND_MATCH = -1;

  export default {
    name: 'TrafficLight',

    components: {
      TrafficLightLamp
    },

    props: {
      routeColor: String,
      signal: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        timer: 0,
        indexOfSignal: 0,
        isForward: true,
        timerID: 0
      }
    },

    computed: {
      nextIndexOfSignal: function() {
        return this.isForward ? this.indexOfSignal + 1 : this.indexOfSignal - 1;
      }
    },

    watch: {
      timer: function() {
        const state = {
          timer: this.timer,
          indexOfSignal: this.indexOfSignal,
          isForward: this.isForward,
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

    mounted() {
      this.startApp();
    },

    beforeDestroy() {
      clearInterval(this.timerID);
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
            this.timer = lastState.timer;
            this.indexOfSignal = lastState.indexOfSignal
            this.isForward = lastState.isForward;
            return;
          }

        }

        this.updateState(index);
      },

      updateState(index) {
        const isExtremeElement = index === 0 || index === this.signal.length - 1;

        if (isExtremeElement) {
          this.isForward = !this.isForward;
        }

        this.indexOfSignal = index;
        this.timer = this.signal[index].timer;

      },

      startTimer() {
        this.timerID = setInterval(() => {
          this.timer -= DECREMENT_OF_TIMER;
        }, NUMBER_OF_MILLISECOND_PER_SECOND)
      }
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