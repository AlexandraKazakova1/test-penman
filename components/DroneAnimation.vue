<template>
  <div class="drone-container">
    <img class="background" src="../img/place.png" alt="background" />
    <img
      class="drone"
      src="https://img.icons8.com/external-basicons-color-edtgraphics/50/external-Drone-drones-basicons-color-edtgraphics-19.png"
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
