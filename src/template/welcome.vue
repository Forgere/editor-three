<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const { scene } = PluginJS.createScene();
  const box = PluginJS.createBox();
  scene.add(box);
});
</script>

<template>
  <div />
</template>
