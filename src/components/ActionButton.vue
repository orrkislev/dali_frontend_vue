<script setup>


const props = defineProps({
    border: {type:Boolean, default: false},
    main: {type:Boolean, default: false},
    inactive: {type:Boolean, default: false},
    selected: {type:Boolean, default: false},
    center: {type:Boolean, default: false},
    single: {type:Boolean, default: false},
    full: {type:Boolean, default: false},
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
            'btnFull-single' : single,
            'btnFull-main':main,
            'btnFull-full': full,
            'btnFull-selected': selected,
            'btnFull-inactive': inactive, 
            'btnFull-correct': indicator=='success',
            'btnFull-wrong': indicator=='fail',
            'btnFull-show': indicator=='show',
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

.btnFull:active{
  background-color: red;
}

.btnFull-single{
  border-radius: 1em !important; /* override last/first of type */
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
.btnFull-full {max-inline-size:unset;}
.btnFull-main {
  border: none;
  background: #3a7fce;
  color: white;
  font-weight: bold;
  /*min-width: 100%;*/
}
.btnFull-selected { background: #c2deff; }
.btnFull-inactive {
  border: none;
  background: #d0d0d0;
  color: #666;
  cursor: default;
}
.btnFull-correct { background: #ccff91;  }
.btnFull-wrong { background: #ff6161; color: black; }
.btnFull-show {background: #6c874c; color: white}
.word_select_selection_right { background: #ccff91 !important; }
.word_select_selection_wrong { background: #ff6161 !important; color: black; }
.draggableItem-success { background: #ccff91 !important; }
.draggableItem-fail { background: #ff6161 !important; color: black; }

.btnFull:hover{ background-color: #d5d5d5; }
.btnFull-main:hover{ background-color: #254c79; }
.btnFull-correct:hover{ background-color: #ccff91; }
.btnFull-wrong:hover{ background-color: #de8c8c; }


.btnFullIcon{ padding: 0 0 0 0.5em; }
</style>