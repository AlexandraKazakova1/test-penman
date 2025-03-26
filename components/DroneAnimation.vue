<template>
  <div class="drone-container">
    <img class="background" src="../img/place.png" alt="background" />
    <img
      class="drone"
      src="https://img.icons8.com/officel/80/airplane-mode-on.png"
      alt="drone"
      :style="droneStyle"
    />
    <button @click="toggleAnimation">
      {{ animationPlaying ? "Stop" : "Start" }}
    </button>
  </div>
</template>

<script>
import useDroneAnimation from "../server/useDroneAnimation";

export default {
  setup() {
    const { x, y, droneStyle, animationPlaying, toggleAnimation, fetchData } =
      useDroneAnimation();

    fetchData();
    return { x, y, droneStyle, animationPlaying, toggleAnimation };
  },
};
</script>

<style scoped>
@import "../styles/drone.css";
</style>
