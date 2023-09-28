<script setup>
import useAPI from "src/utils/useAPI";
const api = useAPI();

const props = defineProps({
  title: String,
  subtitle: String,
  img: String,
});


</script>


<template>
  <div class="page_title_container">
    <div>
      <div class="page_title">{{ title }}</div>
      <div class="page_subtitle">{{ subtitle }}</div>
    </div>
    <img v-if="img" class="page_title_image" :src="api.newSiteImages(img)" />
  </div>
</template>


<script>
export default {
  name: "PageTitle",
};
</script>


<style>
.page_title_container {
  display: flex;
  justify-content: space-between;
}
.page_title{
    font-size: 2em;
    font-weight: bold;
}
.page_title_image{
    max-height: 8em;
}
</style>