<script setup>
import { ref, onBeforeUnmount } from "vue";

const props = defineProps({
  htmlWithScripts: { type: String, required: true },
});
const mediaRef = ref();
const scriptTags = ref([]);

/*
onBeforeUnmount(() => {
  scriptTags.value.forEach((tag) => document.body.removeChild(tag));
});
*/

//onBeforeMount(() => {
  //console.log("props.htmlWithScripts = " + props.htmlWithScripts)
  props.htmlWithScripts.split("<script>").forEach((mediaPart) => {
    //console.log('mediaPart=' + mediaPart);
    const partSplit = mediaPart.split("<" + "/script>");
    //console.log('partSplit=' + partSplit[0]);
    if (partSplit.length == 2) {
      console.log('adding script');
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("charset", "utf-8");
      scriptTag.text = partSplit[0];
      document.body.appendChild(scriptTag);
      scriptTags.value.push(scriptTag);
  }
});


</script>

<template>
  <div class="disableButtons" v-html="htmlWithScripts" ref="mediaRef"></div>
</template>

<script>
export default {
  name: "AjaxViewer",
};
</script>

<style></style>
