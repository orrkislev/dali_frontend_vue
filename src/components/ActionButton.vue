<script setup>


const props = defineProps({
    border: {type:Boolean, default: false},
    main: {type:Boolean, default: false},
    inactive: {type:Boolean, default: false},
    selected: {type:Boolean, default: false},
    center: {type:Boolean, default: false},
    indicator: {type:String, default: ""},
    icon: {type:String, default: null},
    style: {type:Object, default: null},
})
const emit = defineEmits(['click'])

function click() {
    if (!props.inactive) emit('click')
}
</script>


<template>
  <div v-on:click="click" class='btnFull' 
       v-bind:class="{ 
            'btnFull-border': border, 
            'btnFull-center' : center,
            'btnFull-main':main,
            'btnFull-selected': selected,
            'btnFull-inactive': inactive, 
            'btnFull-correct': indicator=='success',
            'btnFull-wrong': indicator=='fail',
        }" v-bind:style="style">
        <i v-if="icon" :class="'btnFullIcon pi pi-' + icon"></i>
        <slot></slot>
    </div>
</template>


<script>
export default {
  name: "ActionButton",
};
</script>


<style>
.btnFull:first-of-type{
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
}
.btnFull:last-of-type{
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
}

.btnFull:hover{
  background-color: brown;
}
.btnFull:active{
  background-color: red;
}

.btnFull {
  cursor: pointer;
  border-radius: 0.3em;
  display: flex;
  max-inline-size: max-content;
  align-items: center;
  padding: 0.3em 0.5em;
  transition: background-color 200ms ease-in-out;
  min-width: 8em;
}

.btnFull-border { border: 1px solid gray; }
.btnFull-center { justify-content: center; }
.btnFull-main {
  border: none;
  background: #3a7fce;
  color: white;
  font-weight: bold;
  min-width: 20em;
}
.btnFull-selected { background: #c2deff; }
.btnFull-inactive {
  border: none;
  background: #d0d0d0;
  color: #666;
}
.btnFull-correct { background: #ccff91; }
.btnFull-wrong { background: tomato; }
.word_select_selection_right { background: #ccff91 !important; }
.word_select_selection_wrong { background: tomato !important; }
.draggableItem-success { background: #ccff91 !important; }
.draggableItem-fail { background: tomato !important; }

.btnFullIcon{
  padding: 0 0 0 0.5em;
}
</style>