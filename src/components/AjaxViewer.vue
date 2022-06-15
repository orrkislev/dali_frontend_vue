<script setup>
import { ref, onBeforeUnmount } from "vue";

const props = defineProps({
  htmlWithScripts: { type: String, required: true },
});
const mediaRef = ref();
const scriptTags = ref([]);

onBeforeUnmount(() => {
  scriptTags.value.forEach((tag) => document.body.removeChild(tag));
});

props.htmlWithScripts.split("<script>").forEach((mediaPart) => {
  const partSplit = mediaPart.split("<" + "/script>");
  if (partSplit.length == 2) {
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
