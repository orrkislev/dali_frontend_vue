<script setup>
</script>


<template>
  <div id="mainContent">
    <slot />
  </div>
</template>


<script>
export default {
  name: "MainContent",
};
</script>


<style>
#mainContent {
  background: white;
  border-radius: 0.5em;
  flex: 3;
  width: 100%;
  height: 100%;
  padding: 1em;
  padding-top: 2em;
  margin-bottom: 5em;
}
</style>