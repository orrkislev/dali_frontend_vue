<script setup>
import ActionButton from './ActionButton.vue';

defineProps({
    title:String, subtitle:String, text:String, action:Function, action_label:String, disabled:Boolean
})
const emit = defineEmits(['click'])
function click() {
    emit('click')
}
</script>


<template>
<div class="teacher_section">
      <div class="teacher_section_title">{{ title }}</div>
      <div class="teacher_section_subtitle">{{ subtitle }}</div>
      <div class="teacher_section_content">
        <div class="teacher_section_content_text">{{ text }} </div>
        <div class="teacher_section_content_action">
          <ActionButton :center='true' :border="true" @click="click" :inactive="disabled">{{ action_label }}</ActionButton>
        </div>
      </div>
    </div>
</template>


<script>
export default {
name:'TeacherActionSection'
};
</script>


<style>
.teacher_section {
  padding: 1.5em 3em;
}
.teacher_section_title {
  font-size: large;
}
.teacher_section_subtitle {
  color: gray;
}
.teacher_section_content {
  display: flex;
  justify-content: space-between;
}
.teacher_section_content_text {
  flex: 4;
}
.teacher_section_content_action {
  padding: 0 1em;
}
</style>