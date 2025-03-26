import { useFetch } from "nuxt/app";
import { ref, computed } from "vue";

export default function useDroneAnimation() {
  const data = ref([]);
  const x = ref(0);
  const y = ref(0);
  const scale = 2;
  const totalTime = 20;
  const currentTime = ref(0);
  const animationPlaying = ref(false);
  let interval = null;

  const containerWidth = 1400;
  const containerHeight = 1200;

  const droneStyle = computed(() => ({
    transform: `translate(${x.value}px, ${y.value}px)`,
    transition: "transform 1s linear",
  }));

  async function fetchData() {
    try {
      const { data: flightData } = await useFetch("/api/flight_data");
      data.value = flightData.value;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function resetPosition() {
    x.value = 0;
    y.value = 0;
  }

  function toggleAnimation() {
    if (animationPlaying.value) {
      clearInterval(interval);
      resetPosition();
    } else {
      startAnimation();
    }
    animationPlaying.value = !animationPlaying.value;
  }

  function startAnimation() {
    currentTime.value = 0;
    x.value = 0;
    y.value = 0;

    const intervalDuration = (totalTime * 1000) / data.value.length;

    interval = setInterval(() => {
      if (currentTime.value >= data.value.length) {
        clearInterval(interval);
        animationPlaying.value = false;
        return;
      }

      const point = data.value[currentTime.value];

      if (point) {
        const speed = parseFloat(point.speed);
        const direction = parseFloat(point.direction);
        const distance = (speed / 60) * 5; // Масштабування
        const radian = (direction * Math.PI) / 180;

        console.log(
          "Current Time:",
          currentTime.value,
          "Speed:",
          speed,
          "Direction:",
          direction
        );

        const newX = x.value + distance * Math.cos(radian) * scale;
        const newY = y.value + distance * Math.sin(radian) * scale;

        x.value = Math.min(Math.max(newX, 0), containerWidth - 10); // Обмеження по ширині
        y.value = Math.min(Math.max(newY, 0), containerHeight - 10); // Обмеження по висоті
      }

      currentTime.value++;
    }, intervalDuration);
  }

  return { x, y, droneStyle, animationPlaying, toggleAnimation, fetchData };
}
